import { ObjectSchema, ValidationError } from 'joi';

export type Result<T> = {
  value: T | null;
  error: ValidationError | null;
};

export abstract class Schema<T> {
  validate = (dto: T): Result<T> => {
    const { value, error } = this.getSchema().validate(dto, {
      stripUnknown: true,
    });

    return { value: value ?? null, error: error ?? null };
  };

  abstract getSchema(): ObjectSchema<T>;
}
