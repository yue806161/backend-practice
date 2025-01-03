import { Request, Response } from 'express';
import * as Schema from '../model/user';
import { responseSuccess } from '../../../utils/response';
import { UserService } from '../service/user';
import { DatabaseType, ErrorCode, StatusCode } from '../../../config';
import { ValidateService } from '../service/validate';
import { ClientError } from '../../../models/error';

const userService = UserService.getInstance(DatabaseType.MongoDB);

export async function getUsers(req: Request, res: Response) {
  const requestQuery = ValidateService.RequestQuery(req, Schema.GetUsersRequestQuery);
  const { status, limit, sort, page } = requestQuery;

  const query = status ? { status } : {};
  const options = { limit: limit, sort: sort, skip: (page - 1) * limit };

  const userList = await userService.getUsers(query, options);

  return responseSuccess(res, 200, 'User list retrieved successfully.', userList);
}

export async function createUser(req: Request, res: Response) {
  const reqBody = ValidateService.RequestBody(req, Schema.CreateUserRequest);
  const { name, email, password, status } = reqBody;

  await userService.createUser({ name, email, password, status });

  return responseSuccess(res, StatusCode.CREATED, 'User created successfully.', undefined, 200);
}

export async function getUser(req: Request, res: Response) {
  const reqParams = ValidateService.RequestParams(req, Schema.GetUsersRequestParams);
  const { id } = reqParams;

  const user = await userService.getUsers({ id });
  if (!user || user.length === 0) throw new ClientError(`id: ${id} not found.`, ErrorCode.RESOURCE_NOT_FOUND);

  return responseSuccess(res, 200, 'User retrieved successfully.', user);
}
// export function updateUser(req: Request, res: Response) {}
// export function deleteUser(req: Request, res: Response) {}
