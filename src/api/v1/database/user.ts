import { DatabaseType } from '../../../config';
import { Database } from '../../../database/abstract.db';
import { IUser, UserSchema } from '../model/user';

export class UserTable extends Database<IUser> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users', UserSchema);
  }
}
