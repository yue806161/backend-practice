import { Database } from './abstract.db';
import { DatabaseType } from './factory';
import { IUser, UserSchema } from '../models/user';

export class UserTable extends Database<IUser> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users', UserSchema);
  }
}
