import { UserResult } from '../../../../core/types/graphql';
import { GetUserByEmailDto } from '../../../../domains/user/dto/get-user-by-email.dto';
import { getQuery } from '../../../utils/graphql';
import { ApiRequest } from '../../../utils/request';
import { UseCaseResult } from '../result';

export const getUserByEmailUseCase = async (
  dto: GetUserByEmailDto,
): Promise<UseCaseResult<UserResult, GetUserByEmailDto>> => {
  const operation = await getQuery('get-user-by-email.graphql');
  const response = await ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();

  return {
    dto,
    data: response.body.data.getUserByEmail,
    errors: response.body.errors,
  };
};
