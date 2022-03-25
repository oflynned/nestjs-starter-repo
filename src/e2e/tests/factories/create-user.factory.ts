import faker from '@faker-js/faker';
import { UserResult } from '../../../core/types/graphql';
import { CreateUserDto } from '../../../domains/user/dto/create-user.dto';
import { createUserUseCase } from '../use-cases/create/create-user.use-case';
import { FactoryResult } from './result';

export const createUserFactory = async (
  args: Partial<CreateUserDto> = {},
): Promise<FactoryResult<UserResult, CreateUserDto>> => {
  const forename = faker.name.firstName();
  const surname = faker.name.lastName();
  const dto: CreateUserDto = {
    name: `${forename} ${surname}`,
    email: faker.internet.email(forename, surname),
    ...args,
  };

  const response = await createUserUseCase(dto);

  return {
    dto,
    data: response.body.data.createUser,
    errors: response.body.errors,
  };
};
