import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ScalarGraphqlResolver {
  @Query('queryTime')
  queryTime(): Date {
    return new Date();
  }

  @Mutation('mutateTime')
  mutateTime(): Date {
    return new Date();
  }
}
