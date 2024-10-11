import { Request, Response } from 'express';
import { UserTable } from '../database/user';
import { DatabaseType } from '../database/factory';

const userTable = new UserTable(DatabaseType.MongoDB);

export function getUsers(req: Request, res: Response) {
  const { active, page = 1, limit = 10, sort = 'asc' } = req.query;

  try {
    const query = active !== undefined ? { active: active === 'true' } : {};
    const options = { limit: Number(limit), sort: String(sort), skip: (Number(page) - 1) * Number(limit) };

    const userList = userTable.read(query, options);
    return res.status(200).json({ error: false, code: 200, message: 'User list fetched successfully', data: userList });
  } catch (error) {
    return res.status(500).json({ error: true, code: 500, message: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

export function createUser(req: Request, res: Response) {
  const { name, email, password, role } = req.body;

  try {
  } catch (error) {
    return res.status(500).json({ error: true, code: 500, message: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}
export function getUser(req: Request, res: Response) {}
export function updateUser(req: Request, res: Response) {}
export function deleteUser(req: Request, res: Response) {}
