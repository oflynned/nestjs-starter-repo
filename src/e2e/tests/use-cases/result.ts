export type UseCaseResult<Result, Dto> = {
  dto: Dto;
  data: Result;
  errors: Error[];
};
