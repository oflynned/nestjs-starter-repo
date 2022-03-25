import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { EmailQueueProducer } from '../../queues/email/email.queue.producer';
import { CreateUserSchema } from './create-user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { InvalidUserArgumentException } from './invalid-user-argument.exception';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepo,
    private readonly emailQueue: EmailQueueProducer,
    private readonly createUserSchema: CreateUserSchema,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const { value, error } = this.createUserSchema.validate(dto);

    if (error) {
      throw new InvalidUserArgumentException(error.message);
    }

    const existingUser = await this.repo.findUserByEmail(value.email);

    if (existingUser) {
      return existingUser;
    }

    const user = await this.repo.createUser(value);

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

  async getUserByEmail(dto: GetUserByEmailDto): Promise<UserEntity | null> {
    const user = await this.repo.findUserByEmail(dto.email);

    return user ?? null;
  }

  async getUserById(dto: GetUserByIdDto): Promise<UserEntity | null> {
    const user = await this.repo.findUserById(dto.id);

    return user ?? null;
  }
}
