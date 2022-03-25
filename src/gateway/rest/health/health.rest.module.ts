import { Module } from '@nestjs/common';
import { HealthRestController } from './health.rest.controller';

@Module({
  controllers: [HealthRestController],
})
export class HealthRestModule {}
