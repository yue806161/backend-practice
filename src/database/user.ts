import { Database, DatabaseType } from './abstract';

interface Ibalance {
  token_id: number;
  digit: number;
  balance: BigInt;
  currency: BigInt;
  value: BigInt;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  wallet: string;
  balances: Ibalance[];
}

export class UserTable extends Database<IUser> {
  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users');
  }
}
