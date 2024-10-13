import { AggregateOptions, AnyBulkWriteOperation, BulkWriteOptions, CreateIndexesOptions, Db, DeleteOptions, FindOptions, InsertOneOptions, MongoClient, UpdateOptions } from 'mongodb';
import { AbstractDatabaseClient, BatchOperation } from './abstract';
import { manyData } from '../utils/database.utils';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

export class MongoDBClient extends AbstractDatabaseClient {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    super();
    this.client = new MongoClient(url);
  }

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db();
      console.log(`Connected to MongoDB at ${url}`);
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.client) await this.client.close();
    if (this.db) this.db = null;
  }

  async create(collection: string, data: any, options?: BulkWriteOptions | InsertOneOptions): Promise<any> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    return manyData(data) ? coll.insertMany(data, options) : coll.insertOne(data, options);
  }

  async read(collection: string, query: any, options?: FindOptions): Promise<any> {
    const db = await this.getDb();
    return db.collection(collection).find(query, options).toArray();
  }

  async update(collection: string, query: any, data: any, options?: UpdateOptions): Promise<any> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    const updateData = { $set: data };
    return manyData(data) ? coll.updateMany(query, updateData, options) : coll.updateOne(query, updateData, options);
  }

  async delete(collection: string, query: any, options?: DeleteOptions): Promise<any> {
    const db = await this.getDb();
    return db.collection(collection).deleteMany(query, options);
  }

  async createIndex(collection: string, index: any, options?: CreateIndexesOptions): Promise<string> {
    const db = await this.getDb();
    const indexes = db.collection(collection).listIndexes();
    const existingIndex = indexes.map((i) => {
      if ((index = i)) return true;
    });
    if (existingIndex) return 'Index already exists';
    return db.collection(collection).createIndex(index, options);
  }

  async batchOperate(collection: string, operations: BatchOperation<any>[], options?: BulkWriteOptions & { upsert?: boolean }): Promise<any> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    const bulkOps: AnyBulkWriteOperation<any>[] = [];

    for (const op of operations) {
      switch (op.type) {
        case 'create':
          if (op.data) bulkOps.push({ insertOne: { document: op.data } });
          break;
        case 'update':
          if (op.query && op.data) bulkOps.push({ updateOne: { filter: op.query, update: { $set: op.data }, upsert: options?.upsert || false } });
          break;
        case 'delete':
          if (op.query) bulkOps.push({ deleteOne: { filter: op.query } });
          break;
        default:
          throw new Error(`Unsupported operation type: ${op.type}`);
      }
    }

    if (bulkOps.length === 0) {
      throw new Error('No valid batch operations provided');
    }

    return coll.bulkWrite(bulkOps, options);
  }

  async aggregate(collection: string, pipeline: any[], options?: AggregateOptions): Promise<any[]> {
    const db = await this.getDb();
    return db.collection(collection).aggregate(pipeline, options).toArray();
  }
}
