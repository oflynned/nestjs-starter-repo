import { MikroORMOptions } from '@mikro-orm/core';
import { join } from 'path';

type ConnectionOptions = Pick<
  MikroORMOptions,
  'type' | 'clientUrl' | 'entities' | 'entitiesTs'
>;

export const getConnectionOptions = (
  databaseUrl: string,
): ConnectionOptions => {
  return {
    type: 'postgresql',
    clientUrl: databaseUrl,
    entities: [join(process.cwd(), 'dist/core/entities/*.entity.js')],
    entitiesTs: [join(process.cwd(), 'src/core/entities/*.entity.ts')],
  };
};
