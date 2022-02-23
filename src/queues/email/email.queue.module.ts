import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { EmailModule } from '../../domains/email/email.module';
import { UserModule } from '../../domains/user/user.module';
import { EmailQueueConsumer } from './email.queue.consumer';
import { EmailQueueProducer, EMAIL_QUEUE } from './email.queue.producer';

@Module({
  imports: [
    BullModule.registerQueue({ name: EMAIL_QUEUE }),
    forwardRef(() => UserModule),
    forwardRef(() => EmailModule),
  ],
  exports: [EmailQueueProducer],
  providers: [EmailQueueProducer, EmailQueueConsumer],
})
export class EmailQueueModule {}
