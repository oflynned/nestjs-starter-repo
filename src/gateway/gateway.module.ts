import { Module } from '@nestjs/common';
import { UserModule } from '../domains/user/user.module';
import { UserGraphqlModule } from './graphql/user/user.graphql.module';

@Module({
  imports: [UserModule, UserGraphqlModule],
  exports: [UserGraphqlModule],
})
export class GatewayModule {}
