import assert from 'assert';
import { createUserFactory } from './factories/user/create-user.factory';
import { getUserByEmailUseCase } from './use-cases/read/get-user-by-email.use-case';
import { getUserByIdUseCase } from './use-cases/read/get-user-by-id.use-case';

describe('User', () => {
  describe('Create', () => {
    describe('when the payload is valid', () => {
      it('should create a new user', async () => {
        const timestamp = new Date();
        const { dto, data: user } = await createUserFactory();

        assert(user.__typename === 'User');

        expect(user.email).toEqual(dto.email);
        expect(new Date(user.createdAt) > timestamp).toBeTruthy();
      });
    });

    describe('when providing invalid data', () => {
      it('should throw on invalid email', async () => {
        const { data } = await createUserFactory({ email: 'not-an-email' });

        assert(data.__typename === 'InvalidUserInput');

        expect(data.message).toEqual('"email" must be a valid email');
      });

      it('should throw on an empty email', async () => {
        const { data } = await createUserFactory({ email: '' });

        assert(data.__typename === 'InvalidUserInput');

        expect(data.message).toEqual('"email" is not allowed to be empty');
      });

      it('should throw on an empty name', async () => {
        const { data } = await createUserFactory({ name: '' });

        assert(data.__typename === 'InvalidUserInput');

        expect(data.message).toEqual('"name" is not allowed to be empty');
      });
    });
  });

  describe('Read', () => {
    describe('when querying by id', () => {
      it('should return user not found', async () => {
        const { data, dto } = await getUserByIdUseCase({
          id: 'does-not-exist',
        });

        assert(data.__typename === 'UserNotFound');

        expect(data.message).toEqual(
          `User with id ${dto.id} could not be found`,
        );
      });

      it('should return user', async () => {
        const { data: user } = await createUserFactory();

        assert(user.__typename === 'User');

        const { data } = await getUserByIdUseCase({ id: user.id });

        assert(data.__typename === 'User');

        expect(data.id).toEqual(user.id);
      });
    });

    describe('when querying by email', () => {
      it('should return user not found', async () => {
        const { data, dto } = await getUserByEmailUseCase({
          email: 'does-not-exist',
        });

        assert(data.__typename === 'UserNotFound');

        expect(data.message).toEqual(
          `User with email ${dto.email} could not be found`,
        );
      });

      it('should return user', async () => {
        const { data: user } = await createUserFactory();

        assert(user.__typename === 'User');

        const { data } = await getUserByEmailUseCase({ email: user.email });

        assert(data.__typename === 'User');

        expect(data.id).toEqual(user.id);
      });
    });
  });
});
