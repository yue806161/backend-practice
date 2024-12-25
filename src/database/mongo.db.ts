import { AggregateOptions, AnyBulkWriteOperation, BulkWriteOptions, BulkWriteResult, CreateIndexesOptions, Db, DeleteOptions, DeleteResult, Document, Filter, FindOptions, IndexSpecification, InsertManyResult, InsertOneOptions, InsertOneResult, MongoClient, OptionalId, UpdateFilter, UpdateOptions, UpdateResult, WithId } from 'mongodb';
import { AbstractDatabaseClient, BatchOperation } from './abstract.db';
import { manyData } from '../utils/database.utils';
import { isFilter } from '../utils/mongo.utils';
import { CONFIG } from '../config';

export class MongoDBClient extends AbstractDatabaseClient {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    super();
    this.client = new MongoClient(CONFIG.mongo_url);
  }

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db();
      console.log(`Connected to MongoDB at ${CONFIG.mongo_url}`);
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.client) await this.client.close();
    if (this.db) this.db = null;
  }

  async create(collection: string, data: OptionalId<Document>[] | OptionalId<Document>, options?: BulkWriteOptions | InsertOneOptions): Promise<InsertOneResult<Document> | InsertManyResult<Document>> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    return manyData<OptionalId<Document>>(data) ? coll.insertMany(data, options) : coll.insertOne(data, options);
  }

  async read(collection: string, query: Filter<Document>, options?: FindOptions): Promise<WithId<Document>[]> {
    const db = await this.getDb();
    return db.collection(collection).find(query, options).toArray();
  }

  async update(collection: string, query: Filter<Document>, data: UpdateFilter<Document>, options?: UpdateOptions, single = true): Promise<UpdateResult<Document>> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    if (single) {
      return coll.updateOne(query, data, options);
    } else {
      return coll.updateMany(query, data, options);
    }
  }

  async delete(collection: string, query: Filter<Document> | undefined, options?: DeleteOptions): Promise<DeleteResult> {
    const db = await this.getDb();
    return await db.collection(collection).deleteMany(query, options);
  }

  async createIndex(collection: string, index: IndexSpecification, options?: CreateIndexesOptions): Promise<string> {
    const db = await this.getDb();
    const indexes = db.collection(collection).listIndexes();
    const existingIndex = indexes.map((i) => {
      if ((index = i)) return true;
    });
    if (existingIndex) return 'Index already exists';
    return db.collection(collection).createIndex(index, options);
  }

  async batchOperate<T extends Document>(collection: string, operations: BatchOperation<T>[], options?: BulkWriteOptions & { upsert?: boolean }): Promise<BulkWriteResult> {
    const db = await this.getDb();
    const coll = db.collection<T>(collection);
    const bulkOps: AnyBulkWriteOperation<T>[] = [];

    for (const op of operations) {
      switch (op.type) {
        case 'create': {
          if (!op.data) break;
          const insertOp: AnyBulkWriteOperation<T> = { insertOne: { document: op.data as OptionalId<T> } };
          if (op.data) bulkOps.push(insertOp);
          break;
        }
        case 'update': {
          if (!isFilter(op.query)) break;
          const updateOp: AnyBulkWriteOperation<T> = { updateOne: { filter: op.query, update: { $set: op.data }, upsert: options?.upsert || false } };
          if (op.query && op.data) bulkOps.push(updateOp);
          break;
        }
        case 'delete': {
          if (!isFilter(op.query)) break;
          const deleteOp: AnyBulkWriteOperation<T> = { deleteOne: { filter: op.query } };
          if (op.query) bulkOps.push(deleteOp);
          break;
        }
        default:
          throw new Error(`Unsupported operation type: ${op.type}`);
      }
    }

    if (bulkOps.length === 0) {
      throw new Error('No valid batch operations provided');
    }

    return coll.bulkWrite(bulkOps, options);
  }

  async aggregate(collection: string, pipeline: Document[], options?: AggregateOptions): Promise<Document[]> {
    const db = await this.getDb();
    return db.collection(collection).aggregate(pipeline, options).toArray();
  }
}
