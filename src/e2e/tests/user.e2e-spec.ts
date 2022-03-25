import assert from 'assert';
import { createUserFactory } from './factories/create-user.factory';

describe('User', () => {
  describe('Create', () => {
    it('should create a new user', async () => {
      const timestamp = new Date();
      const { dto, data: user } = await createUserFactory();

      assert(user.__typename === 'User');

      expect(user.email).toEqual(dto.email);
      expect(new Date(user.createdAt) > timestamp).toBeTruthy();
    });

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
