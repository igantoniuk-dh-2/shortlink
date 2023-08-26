import { User } from './user.schema';

export interface CreateUserResult {
  jwt: string;
  user: Partial<User>;
}

export interface LoginUserResult extends CreateUserResult {
  // ...
}

export interface CheckUserResult extends CreateUserResult {
  // ...
}
