import { Request, Response } from 'express';
import { DatabaseType } from '../database/factory';
import { CreateUserRequest, GetUserListRequest, GetUserRequest } from '../models/user.model';
import { response } from '../utils/controller.utils';
import { UserService } from '../services/user.service';

const userService = UserService.getInstance(DatabaseType.MongoDB);

export async function getUsers(req: Request, res: Response) {
  try {
    const reqParams = GetUserListRequest.parse(req.query);
    const { status, limit, page, sort } = reqParams;

    const query = status ? { status } : {};
    const options = { limit: Number(limit), sort: String(sort), skip: (Number(page) - 1) * Number(limit) };

    const userList = await userService.getUsers(query, options);

    return response(res, 200, 'User list retrieved successfully.', userList);
  } catch (error) {
    return response(res, 500, error);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const reqParams = CreateUserRequest.parse(req.body);
    const { name, email, password, role, status } = reqParams;

    //userTable.create({ id: randomUUID(), name, email, password, role, status, timestamps: { created_at: Date.now(), updated_at: Date.now() } });
    await userService.createUser({ name, email, password, role, status });

    return response(res, 201, 'User created successfully.', undefined, 200);
  } catch (error) {
    return response(res, 500, error);
  }
}
export async function getUser(req: Request, res: Response) {
  try {
    const reqParams = GetUserRequest.parse(req.query);
    const { id } = reqParams;

    const user = await userService.getUsers({id});

    return response(res, 200, 'User retrieved successfully.', user);
  } catch (error) {
    return response(res, 500, error);
  }
}
export function updateUser(req: Request, res: Response) {}
export function deleteUser(req: Request, res: Response) {}
