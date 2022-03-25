import { MikroORM, RequestContext } from '@mikro-orm/core';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../../domains/email/email.service';
import { UserService } from '../../domains/user/user.service';
import { EmailJob, EMAIL_QUEUE, SEND_EMAIL_JOB } from './email.queue.producer';

@Processor(EMAIL_QUEUE)
export class EmailQueueConsumer {
  constructor(
    private readonly orm: MikroORM,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Process(SEND_EMAIL_JOB)
  async processEmailJob(job: Job<EmailJob>): Promise<void> {
    await RequestContext.createAsync(this.orm.em, async () => {
      const result = await this.emailService.sendEmail(
        job.data.email,
        job.data.content,
      );

      // if (result === EmailStatus.DELIVERED) {
      //   await this.userService.markUserNotified(data.email);
      // }
    });
  }
}
