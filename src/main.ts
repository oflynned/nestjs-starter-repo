import { CorrelationIdMiddleware } from '@eropple/nestjs-correlation-id';
import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import expressBasicAuth from 'express-basic-auth';
import { ApiModule } from './api.module';
import { ApiConfigService } from './core/config/api.config.service';
import { EMAIL_QUEUE } from './queues/email/email.queue.producer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    cors: true,
  });

  const config = app.get(ApiConfigService);

  app.use(CorrelationIdMiddleware());

  const queues = [app.get<Queue>(`BullQueue_${EMAIL_QUEUE}`)];

  const { router: bullRouter } = createBullBoard(
    queues.map((queue) => new BullAdapter(queue)),
  );

  if (config.isProductionOrStagingMode()) {
    const requireAdmin = expressBasicAuth({
      users: { [config.getAdminUsername()]: config.getAdminPassword() },
      challenge: true,
    });

    // https://selleo.com/til/posts/lkkkedpjjl-bull-board-for-nestjs
    app.use('/admin/queues', requireAdmin, bullRouter);
  } else {
    app.use('/admin/queues', bullRouter);
  }

  await app.listen(config.getPort(), '0.0.0.0', () => {
    console.log(`Service is up on localhost:${config.getPort()}`);
  });
}

bootstrap();
