import { UserResult } from '../../../../core/types/graphql';
import { CreateUserDto } from '../../../../domains/user/dto/create-user.dto';
import { getMutation } from '../../../utils/graphql';
import { ApiRequest, GraphqlRequest } from '../../../utils/request';

export const createUserUseCase = async (
  dto: CreateUserDto,
): Promise<GraphqlRequest<UserResult>> => {
  const operation = await getMutation('create-user.graphql');

  return ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();
};
