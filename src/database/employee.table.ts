import { EmployeeSchema, IEmployee } from '../models/employee';
import { Database } from './abstract.db';
import { DatabaseType } from './factory';


export class EmployeeTable extends Database<IEmployee> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users', EmployeeSchema);
  }
}