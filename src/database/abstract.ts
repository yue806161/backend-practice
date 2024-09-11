import { MongoDBClient } from './mongoDB';

export enum DatabaseType {
  DynamoDB,
  MongoDB,
  Redis,
  MySQL,
  Flux,
  Prisma,
}

export abstract class AbstractDatabaseClient {
  abstract close(): Promise<void>;

  abstract create(collection: string, data: any): Promise<any>;
  abstract read(collection: string, query: any): Promise<any>;
  abstract update(collection: string, query: any, data: any): Promise<any>;
  abstract delete(collection: string, query: any): Promise<any>;
}

class DatabaseFactory {
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

export class Database<T> {
  private client: AbstractDatabaseClient;

  constructor(private databaseType: DatabaseType, private collection: string) {
    this.client = DatabaseFactory.getDatabaseClient(databaseType);
    this.collection = collection;
  }

  async create(data: T | T[]): Promise<any> {
    return await this.client.create(this.collection, data);
  }

  async read(query: Partial<T>): Promise<T[]> {
    return await this.client.read(this.collection, query);
  }

  async update(query: Partial<T>, data: Partial<T>): Promise<any> {
    return await this.client.update(this.collection, query, data);
  }

  async delete(query: Partial<T>): Promise<any> {
    return await this.client.delete(this.collection, query);
  }

  async close(): Promise<void> {
    return await this.client.close();
  }
}
