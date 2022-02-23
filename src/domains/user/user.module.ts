import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { EmailQueueModule } from '../../queues/email/email.queue.module';
import { CreateUserSchema } from './create-user.schema';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity]), EmailQueueModule],
  providers: [UserRepo, UserService, CreateUserSchema],
  exports: [UserService],
})
export class UserModule {}
