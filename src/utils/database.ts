/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseType } from '../config';
import { MongoDBClient } from '../database/mongo.db';

export interface BatchOperation<T> {
  type: 'create' | 'update' | 'delete';
  data?: T;
  query?: Partial<T>;
}

export abstract class AbstractDatabaseClient {
  abstract close(): Promise<void>;

  abstract create(collection: string, data: any, options?: any): Promise<any>;
  abstract read(collection: string, query: any, options?: any): Promise<any>;
  abstract update(collection: string, query: any, data: any, options?: any): Promise<any>;
  abstract delete(collection: string, query: any, options?: any): Promise<any>;
  abstract createIndex(collection: string, index: any, options?: any): Promise<any>;

  abstract batchOperate(collection: string, operations: BatchOperation<any>[], options?: any): Promise<any>;
  abstract aggregate(collection: string, pipeline: any[], options?: any): Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseFactory {
  static getDatabaseClient(database: DatabaseType): AbstractDatabaseClient {
    switch (database) {
      case DatabaseType.MongoDB:
        return new MongoDBClient();
      case DatabaseType.DynamoDB:
        throw new Error('DynamoDB client not implemented yet');
      default:
        throw new Error('Unsupported database');
    }
  }

  static getDatabaseList(): (string | DatabaseType)[] {
    return Object.values(DatabaseType);
  }
}

export function manyData<T>(data: object | object[]): data is T[] {
  return Array.isArray(data) && data.length > 1;
}
