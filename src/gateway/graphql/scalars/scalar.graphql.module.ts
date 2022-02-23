import { Module } from '@nestjs/common';
import { ScalarGraphqlResolver } from './scalar.graphql.resolver';

@Module({
  providers: [ScalarGraphqlResolver],
  exports: [ScalarGraphqlResolver],
})
export class ScalarGraphqlModule {}
