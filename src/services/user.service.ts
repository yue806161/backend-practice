import { UserTable } from '../database/user.table';
import { DatabaseType } from '../database/factory';
import { randomUUID } from 'crypto';
import { IUser } from '../models/user.model';
import { hash } from '../utils/service.utils';

export class UserService {
  private static instance: UserService;
  public userTable: UserTable;

  private constructor(databaseType: DatabaseType) {
    this.userTable = new UserTable(databaseType);
  }

  public static getInstance(databaseType: DatabaseType): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(databaseType);
    }
    return UserService.instance;
  }

  async getUsers(query: Partial<IUser>, options: unknown = {}) {
    return this.userTable.read(query, options);
  }

  async createUser(data: { name: string; email: string; password: string; role: string; status: string }) {
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

  async banUser(id: string) {
    return this.userTable.update({ id }, { status: 'banned' });
  }
}
