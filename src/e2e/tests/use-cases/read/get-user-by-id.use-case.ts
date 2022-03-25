import { UserResult } from '../../../../core/types/graphql';
import { GetUserByIdDto } from '../../../../domains/user/dto/get-user-by-id.dto';
import { getQuery } from '../../../utils/graphql';
import { ApiRequest } from '../../../utils/request';
import { UseCaseResult } from '../result';

export const getUserByIdUseCase = async (
  dto: GetUserByIdDto,
): Promise<UseCaseResult<UserResult, GetUserByIdDto>> => {
  const operation = await getQuery('get-user-by-id.graphql');

  const response = await ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();

  return {
    dto,
    data: response.body.data.getUserById,
    errors: response.body.errors,
  };
};
