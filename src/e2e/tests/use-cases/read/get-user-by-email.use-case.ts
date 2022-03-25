import { UserResult } from '../../../../core/types/graphql';
import { GetUserByEmailDto } from '../../../../domains/user/dto/get-user-by-email.dto';
import { getQuery } from '../../../utils/graphql';
import { ApiRequest, GraphqlRequest } from '../../../utils/request';

export const getUserByIdUseCase = async (
  dto: GetUserByEmailDto,
): Promise<GraphqlRequest<UserResult>> => {
  const operation = await getQuery('get-user-by-email.graphql');

  return ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();
};
