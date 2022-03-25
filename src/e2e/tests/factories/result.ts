export type FactoryResult<Result, Dto> = {
  dto: Dto;
  data: Result;
  errors: Error[];
};
