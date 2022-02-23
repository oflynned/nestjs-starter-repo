import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ abstract: true })
export abstract class AbstractEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property({ nullable: false })
  createdAt: Date;

  @Property({ nullable: true })
  lastUpdatedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;
}
