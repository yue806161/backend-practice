import { AbstractDatabaseClient } from './abstract';
import { MongoDBClient } from './mongo.db';

export enum DatabaseType {
  DynamoDB,
  MongoDB,
  Redis,
  MySQL,
  Flux,
  Prisma,
}

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
