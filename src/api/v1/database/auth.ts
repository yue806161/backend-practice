import { DatabaseType } from '../../../config';
import { AuthSchema, IAuth } from '../model/auth';
import { Database } from '../../../database/abstract.db';

export class AuthTable extends Database<IAuth> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'authentication', AuthSchema);
  }
}
