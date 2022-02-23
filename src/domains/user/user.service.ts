import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { EmailQueueProducer } from '../../queues/email/email.queue.producer';
import { CreateUserDto } from './create-user.dto';
import { CreateUserSchema } from './create-user.schema';
import { InvalidUserArgumentException } from './invalid-user-argument.exception';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepo,
    private readonly emailQueue: EmailQueueProducer,
    private readonly createUserSchema: CreateUserSchema,
  ) {}

  async createUser(name: string, email: string): Promise<UserEntity> {
    const { value, error } = this.createUserSchema.validate({ name, email });

    if (error) {
      throw new InvalidUserArgumentException();
    }

    const dto: CreateUserDto = { name: value.name, email: value.email };
    const existingUser = await this.repo.findUserByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const user = await this.repo.createUser(dto);

    await this.emailQueue.enqueue({
      email: user.email,
      content: `Welcome! You signed up at ${user.createdAt.toISOString()}.`,
    });

    return user;
  }

  async markUserNotified(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findUserByEmail(email);

    if (user) {
      return this.repo.updateNotifiedAtTimestamp(user);
    }

    return null;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findUserByEmail(email);

    return user ?? null;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.repo.findUserById(id);

    return user ?? null;
  }
}
