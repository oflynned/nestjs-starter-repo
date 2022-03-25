import { UserResult } from '../../../../core/types/graphql';
import { CreateUserDto } from '../../../../domains/user/dto/create-user.dto';
import { getMutation } from '../../../utils/graphql';
import { ApiRequest } from '../../../utils/request';
import { UseCaseResult } from '../result';

export const createUserUseCase = async (
  dto: CreateUserDto,
): Promise<UseCaseResult<UserResult, CreateUserDto>> => {
  const operation = await getMutation('create-user.graphql');
  const response = await ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();

  return {
    dto,
    data: response.body.data.createUser,
    errors: response.body.errors,
  };
};
