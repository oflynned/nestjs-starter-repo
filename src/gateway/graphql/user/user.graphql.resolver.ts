import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserResult } from '../../../core/types/graphql';
import { UserService } from '../../../domains/user/user.service';

@Resolver('user')
export class UserGraphqlResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async createUser(@Args('name') name: string): Promise<UserResult> {
    try {
      const user = await this.userService.createUser(name);

      return {
        __typename: 'User',
        ...user,
      };
    } catch (e) {
      return {
        __typename: 'InvalidUserInput',
        message: e.message,
      };
    }
  }

  @Query('getUserById')
  async getUserById(@Args('id') id: string): Promise<UserResult> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      return {
        __typename: 'UserNotFound',
        message: `User with id ${id} could not be found`,
      };
    }

    if (user.deletedAt) {
      return {
        __typename: 'DeletedUser',
        id: user.id,
        deletedAt: user.deletedAt ?? new Date(),
      };
    }

    return {
      __typename: 'User',
      ...user,
    };
  }
}
