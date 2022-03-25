import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserResult } from '../../../core/types/graphql';
import { CreateUserDto } from '../../../domains/user/dto/create-user.dto';
import { GetUserByEmailDto } from '../../../domains/user/dto/get-user-by-email.dto';
import { GetUserByIdDto } from '../../../domains/user/dto/get-user-by-id.dto';
import { InvalidUserArgumentException } from '../../../domains/user/invalid-user-argument.exception';
import { UserService } from '../../../domains/user/user.service';

@Resolver('user')
export class UserGraphqlResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<UserResult> {
    const dto: CreateUserDto = { name, email };
    try {
      const user = await this.userService.createUser(dto);

      return {
        __typename: 'User',
        ...user,
      };
    } catch (e) {
      if (e instanceof InvalidUserArgumentException) {
        return {
          __typename: 'InvalidUserInput',
          message: e.message,
        };
      }

      return {
        __typename: 'InvalidUserInput',
        message: 'Something went wrong',
      };
    }
  }

  @Query('getUserById')
  async getUserById(@Args('id') id: string): Promise<UserResult> {
    const dto: GetUserByIdDto = { id };
    const user = await this.userService.getUserById(dto);

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

  @Query('getUserByEmail')
  async getUserByEmail(@Args('email') email: string): Promise<UserResult> {
    const dto: GetUserByEmailDto = { email };
    const user = await this.userService.getUserByEmail(dto);

    if (!user) {
      return {
        __typename: 'UserNotFound',
        message: `User with email ${email} could not be found`,
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
