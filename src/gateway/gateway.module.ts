import { Module } from '@nestjs/common';
import { UserGraphqlModule } from './graphql/user/user.graphql.module';

@Module({
  imports: [UserGraphqlModule],
  exports: [UserGraphqlModule],
})
export class GatewayModule {}
