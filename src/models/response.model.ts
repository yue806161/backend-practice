import { StatusCode } from '../config';

export interface IResponce {
  statusCode: StatusCode;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
