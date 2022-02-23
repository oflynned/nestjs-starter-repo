import { Migration } from '@mikro-orm/migrations';

export class Migration20220223142045 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "last_updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "email" varchar(255) not null, "notified_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_pkey" primary key ("id");',
    );
  }
}
