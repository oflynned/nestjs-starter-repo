import { Module } from '@nestjs/common';
import { UserModule } from '../domains/user/user.module';
import { UserGraphqlModule } from './graphql/user/user.graphql.module';
import { HealthRestModule } from './rest/health/health.rest.module';

@Module({
  imports: [UserModule, UserGraphqlModule, HealthRestModule],
  exports: [UserGraphqlModule, HealthRestModule],
})
export class GatewayModule {}
