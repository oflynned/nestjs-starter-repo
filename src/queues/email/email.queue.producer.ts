import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export const EMAIL_QUEUE = 'email-queue';
export const SEND_EMAIL_JOBS = 'email-queue';

export type EmailJob = { email: string; content: string };

@Injectable()
export class EmailQueueProducer {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly queue: Queue) {}

  async enqueue(data: EmailJob): Promise<void> {
    await this.queue.add(SEND_EMAIL_JOBS, data);
  }
}
