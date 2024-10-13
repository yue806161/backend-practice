import { Database } from './abstract';
import { DatabaseType } from './factory';
import { IUser, UserSchema } from '../models/user.model';

export class UserTable extends Database<IUser> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users', UserSchema);
  }
}
