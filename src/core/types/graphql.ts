/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
  __typename?: 'IQuery';
  queryTime(): DateTime | Promise<DateTime>;
  getUserById(id: string): UserResult | Promise<UserResult>;
  getUserByEmail(email: string): UserResult | Promise<UserResult>;
}

export interface IMutation {
  __typename?: 'IMutation';
  mutateTime(): DateTime | Promise<DateTime>;
  createUser(name: string, email: string): UserResult | Promise<UserResult>;
}

export interface User {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
  createdAt: DateTime;
}

export interface DeletedUser {
  __typename?: 'DeletedUser';
  id: string;
  deletedAt: DateTime;
}

export interface InvalidUserInput {
  __typename?: 'InvalidUserInput';
  message: string;
}

export interface UserNotFound {
  __typename?: 'UserNotFound';
  message: string;
}

export type DateTime = Date;
export type UserResult = User | DeletedUser | UserNotFound | InvalidUserInput;
type Nullable<T> = T | null;
