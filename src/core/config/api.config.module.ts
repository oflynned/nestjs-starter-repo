import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './api.config.service';

@Module({
  imports: [ConfigModule],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
