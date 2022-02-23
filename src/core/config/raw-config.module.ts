import { Module } from '@nestjs/common';
import { RawConfigService } from './raw-config.service';

@Module({
  exports: [RawConfigService],
  providers: [RawConfigService],
})
export class RawConfigModule {}
