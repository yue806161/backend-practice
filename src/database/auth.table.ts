import { AuthSchema, IAuth } from '../models/auth';
import { Database } from './abstract.db';
import { DatabaseType } from './factory';


export class AuthTable extends Database<IAuth> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'authentication',AuthSchema );
  }
}
