import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { EmailQueueModule } from '../../queues/email/email.queue.module';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity]), EmailQueueModule],
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UserModule {}
