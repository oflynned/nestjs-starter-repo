import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from './abstract.entity';

@Entity({ tableName: 'users' })
export class UserEntity extends AbstractEntity {
  @Property({ type: 'string', nullable: false })
  name: string;

  @Property({ type: 'string', nullable: false })
  email: string;

  @Property({ nullable: true })
  notifiedAt?: Date;
}
