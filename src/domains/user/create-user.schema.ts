import Joi from 'joi';
import { Schema } from '../../core/joi/schema';
import { CreateUserDto } from './create-user.dto';

export class CreateUserSchema extends Schema<CreateUserDto> {
  getSchema(): Joi.ObjectSchema<CreateUserDto> {
    return Joi.object({
      name: Joi.string().trim().min(1).max(256).required(),
    });
  }
}
