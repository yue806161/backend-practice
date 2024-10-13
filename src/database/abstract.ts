import { ZodObject, ZodRawShape } from 'zod';
import { DatabaseFactory, DatabaseType } from './factory';

export type BatchOperation<T> = {
  type: 'create' | 'update' | 'delete';
  data?: T;
  query?: Partial<T>;
};

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

export class Database<T> {
  private client: AbstractDatabaseClient;
  private schema: ZodObject<ZodRawShape>;
  private partialSchema: ZodObject<ZodRawShape>;

  constructor(private databaseType: DatabaseType, private collection: string, schema: ZodObject<ZodRawShape>) {
    this.client = DatabaseFactory.getDatabaseClient(databaseType);
    this.schema = schema;
    this.partialSchema = schema.partial();
  }

  async create(data: T | T[], options?: any): Promise<any> {
    try {
      this.validate(data);
      return await this.client.create(this.collection, data, options);
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  }

  async read(query: Partial<T>, options?: any): Promise<T[]> {
    try {
      return await this.client.read(this.collection, query, options);
    } catch (error) {
      console.error('Error reading data:', error);
      throw error;
    }
  }

  async update(query: Partial<T>, data: Partial<T>, options?: any): Promise<any> {
    try {
      this.validate(data, true);
      return await this.client.update(this.collection, query, data, options);
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }

  async delete(query: Partial<T>, options?: any): Promise<any> {
    try {
      return await this.client.delete(this.collection, query, options);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }

  async createIndex(index: string, options?: any): Promise<any> {
    try {
      return await this.client.createIndex(this.collection, index, options);
    } catch (error) {
      console.error('Error creating index:', error);
      throw error;
    }
  }

  async batchOperate(operations: Array<{ type: 'create' | 'update' | 'delete'; data?: any; query?: any }>, options?: any): Promise<any> {
    try {
      operations.forEach((operation) => {
        if (operation.type === 'create') {
          this.validate(operation.data);
        } else if (operation.type === 'update') {
          this.validate(operation.data, true);
        }
      });
      return await this.client.batchOperate(this.collection, operations, options);
    } catch (error) {
      console.error('Error during batchOperate:', error);
      throw error;
    }
  }

  async aggregate(pipeline: any[], options?: any): Promise<any> {
    try {
      return await this.client.aggregate(this.collection, pipeline, options);
    } catch (error) {
      console.error('Error during aggregation:', error);
      throw error;
    }
  }

  private validate(data: T | T[] | Partial<T>, isPartial: boolean = false): void {
    try {
      const schemaToUse = isPartial ? this.partialSchema : this.schema;
      if (Array.isArray(data)) {
        data.forEach((item) => schemaToUse.parse(item));
      } else {
        schemaToUse.parse(data);
      }
    } catch (error) {
      throw error;
    }
  }
}
