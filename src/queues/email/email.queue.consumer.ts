import { MikroORM } from '@mikro-orm/core';
import { UseRequestContext } from '@mikro-orm/nestjs';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../../domains/email/email.service';
import { EmailStatus } from '../../domains/email/email.status';
import { UserService } from '../../domains/user/user.service';
import { EmailJob, EMAIL_QUEUE, SEND_EMAIL_JOBS } from './email.queue.producer';

@Processor(EMAIL_QUEUE)
export class EmailQueueConsumer {
  constructor(
    private readonly orm: MikroORM,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Process(SEND_EMAIL_JOBS)
  async processEmailJob(job: Job<EmailJob>): Promise<void> {
    await this.sendEmailJob(job.data);
  }

  @UseRequestContext()
  async sendEmailJob(data: EmailJob): Promise<void> {
    const result = await this.emailService.sendEmail(data.email, data.content);

    if (result === EmailStatus.DELIVERED) {
      await this.userService.markUserNotified(data.email);
    }
  }
}
