import { Request, Response } from 'express';
import { DatabaseType } from '../database/factory';
import { CreateUserRequest, GetUsersRequestParams, GetUsersRequestQuery } from '../models/user.model';
import { responseError, responseSuccess } from '../utils/controller.utils';
import { UserService } from '../services/user.service';
import { ZodError } from 'zod';
import { StatusCode } from '../config';
import { ClientError } from '../models/error.model';
import { ValidateService } from '../services/validate.service';

const userService = UserService.getInstance(DatabaseType.MongoDB);

export async function getUsers(req: Request, res: Response) {
  try {
    const reqQuery = ValidateService.RequestQuery(req, GetUsersRequestQuery);
    const { status, limit, sort, page } = reqQuery;

    const query = status ? { status } : {};
    const options = { limit: Number(limit), sort: String(sort), skip: (Number(page) - 1) * Number(limit) };

    const userList = await userService.getUsers(query, options);

    return responseSuccess(res, 200, 'User list retrieved successfully.', userList);
  } catch (error) {
    if (error instanceof ZodError) return responseError(res, 400, 'Invalid request body.', error);
    return responseError(res, 500, 'Internal server error.', error);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const reqBody = ValidateService.RequestBody(req, CreateUserRequest);
    const { name, email, password, status } = reqBody;

    await userService.createUser({ name, email, password, status });

    return responseSuccess(res, StatusCode.CREATED, 'User created successfully.', undefined, 200);
  } catch (error) {
    if (error instanceof ZodError) return responseError(res, StatusCode.BAD_REQUEST, 'Invalid request body.', error);
    if (error instanceof ClientError) return responseError(res, error.statusCode, error.message, error);
    return responseError(res, StatusCode.INTERNAL_SERVER_ERROR, 'Internal server error.', error);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const reqParams = ValidateService.RequestParams(req, GetUsersRequestParams);
    const { id } = reqParams;

    const user = await userService.getUsers({ id });

    return responseSuccess(res, 200, 'User retrieved successfully.', user);
  } catch (error) {
    if (error instanceof ZodError) return responseError(res, 400, 'Invalid request body.', error);
    return responseError(res, 500, 'Internal server error.', error);
  }
}
// export function updateUser(req: Request, res: Response) {}
// export function deleteUser(req: Request, res: Response) {}
