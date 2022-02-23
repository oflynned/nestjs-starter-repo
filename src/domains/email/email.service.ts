import { Injectable } from '@nestjs/common';
import { EmailStatus } from './email.status';

@Injectable()
export class EmailService {
  async sendEmail(email: string, content: string): Promise<EmailStatus> {
    console.log(`${email} -> ${content}`);

    return EmailStatus.DELIVERED;
  }
}
