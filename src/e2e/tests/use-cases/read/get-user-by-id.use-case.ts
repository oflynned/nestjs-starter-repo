import { UserResult } from '../../../../core/types/graphql';
import { GetUserByIdDto } from '../../../../domains/user/dto/get-user-by-id.dto';
import { getQuery } from '../../../utils/graphql';
import { ApiRequest, GraphqlRequest } from '../../../utils/request';

export const getUserByIdUseCase = async (
  dto: GetUserByIdDto,
): Promise<GraphqlRequest<UserResult>> => {
  const operation = await getQuery('get-user-by-id.graphql');

  return ApiRequest.builder<UserResult>()
    .withOperation(operation)
    .withVariables(dto)
    .build()
    .send();
};
