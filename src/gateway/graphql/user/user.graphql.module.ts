import { Module } from '@nestjs/common';
import { UserModule } from '../../../domains/user/user.module';
import { UserGraphqlResolver } from './user.graphql.resolver';

@Module({
  imports: [UserModule],
  providers: [UserGraphqlResolver],
})
export class UserGraphqlModule {}
