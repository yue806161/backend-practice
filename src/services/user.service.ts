import { UserTable } from '../database/user.table';
import { DatabaseType } from '../database/factory';
import { randomUUID } from 'crypto';
import { IUser } from '../models/user.model';
import { hash } from '../utils/service.utils';
import { ClientError } from '../models/error.model';
import { ErrorCode } from '../config';

export class UserService {
  private static _instance: UserService;
  private userTable: UserTable;

  private constructor(databaseType: DatabaseType) {
    this.userTable = new UserTable(databaseType);
  }

  static getInstance(databaseType: DatabaseType): UserService {
    if (!this._instance) {
      this._instance = new UserService(databaseType);
    }
    return this._instance;
  }

  async getUsers(query: Partial<IUser>, options: unknown = {}) {
    return this.userTable.read(query, options);
  }

  async createUser(data: { name: string; email: string; password: string; status: 'active' | 'revoke' }) {
    const existingUser = await this.userTable.read({ email: data.email });
    if (existingUser) throw new ClientError('User already exists', ErrorCode.RESOURCE_ALREADY_EXISTS);

    const now = { date: new Date(), time: Date.now() };
    const newUser = {
      id: randomUUID(),
      ...data,
      password_hash: await hash(data.password),
      timestamps: { created_at: now, updated_at: now },
    };

    return this.userTable.create(newUser);
  }

  async updateUser(id: string, data: Partial<IUser>) {
    const now = { date: new Date(), time: Date.now() };
    const updatedUser = {
      ...data,
      timestamps: { updated_at: now },
    };

    return this.userTable.update({ id }, updatedUser);
  }

  async deleteUser(id: string) {
    return this.userTable.delete({ id });
  }

  // async banUser(id: string) {
  //   return this.userTable.update({ id }, { status: 'banned' });
  // }
}
