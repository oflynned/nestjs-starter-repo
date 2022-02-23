import { Module } from '@nestjs/common';
import { UserService } from '../../../domains/user/user.service';
import { UserGraphqlResolver } from './user.graphql.resolver';

@Module({
  imports: [UserService],
  providers: [UserGraphqlResolver],
})
export class UserGraphqlModule {}
