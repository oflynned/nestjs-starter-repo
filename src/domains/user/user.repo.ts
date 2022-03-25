import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: EntityRepository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const entity = this.repo.create({ ...dto, createdAt: new Date() });

    await this.repo.persistAndFlush(entity);

    return entity;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ email });
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ id });
  }

  async updateNotifiedAtTimestamp(entity: UserEntity): Promise<UserEntity> {
    entity.notifiedAt = new Date();
    await this.repo.persistAndFlush(entity);

    return entity;
  }

  async findUserByName(name: string): Promise<UserEntity | null> {
    return this.repo.findOne({ name });
  }
}
