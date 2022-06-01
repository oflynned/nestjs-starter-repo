import { faker } from '@faker-js/faker';
import { UserResult } from '../../../../core/types/graphql';
import { CreateUserDto } from '../../../../domains/user/dto/create-user.dto';
import { createUserUseCase } from '../../use-cases/create/create-user.use-case';
import { UseCaseResult } from '../../use-cases/result';

export const createUserFactory = async (
  args: Partial<CreateUserDto> = {},
): Promise<UseCaseResult<UserResult, CreateUserDto>> => {
  const forename = faker.name.firstName();
  const surname = faker.name.lastName();
  const dto: CreateUserDto = {
    name: `${forename} ${surname}`,
    email: faker.internet.email(forename, surname),
    ...args,
  };

  return createUserUseCase(dto);
};
