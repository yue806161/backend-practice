/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, ZodRawShape } from 'zod';
import { AbstractDatabaseClient, DatabaseFactory } from '../utils/database';
import { DatabaseType } from '../config';

export class Database<T> {
  private client: AbstractDatabaseClient;
  private schema: ZodObject<ZodRawShape>;
  private partialSchema: ZodObject<ZodRawShape>;

  constructor(
    private databaseType: DatabaseType,
    private collection: string,
    schema: ZodObject<ZodRawShape>
  ) {
    this.client = DatabaseFactory.getDatabaseClient(this.databaseType);
    this.schema = schema;
    this.partialSchema = schema.partial();
  }

  async create(data: T | T[], options?: unknown): Promise<any> {
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

  async batchOperate(operations: { type: 'create' | 'update' | 'delete'; data?: any; query?: any }[], options?: any): Promise<any> {
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

  private validate(data: T | T[] | Partial<T>, isPartial = false): void {
    const schemaToUse = isPartial ? this.partialSchema : this.schema;
    if (Array.isArray(data)) {
      data.forEach((item) => schemaToUse.parse(item));
    } else {
      schemaToUse.parse(data);
    }
  }
}