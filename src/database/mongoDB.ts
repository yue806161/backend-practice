import { Db, MongoClient } from 'mongodb';
import { AbstractDatabaseClient } from './abstract';
import { manyData } from '../utils/database';

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
    await this.client.close();
    this.db = null;
  }

  async create(collection: string, data: any): Promise<any> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    return manyData(data) ? coll.insertMany(data) : coll.insertOne(data);
  }

  async read(collection: string, query: any): Promise<any> {
    const db = await this.getDb();
    return db.collection(collection).find(query).toArray();
  }

  async update(collection: string, query: any, data: any): Promise<any> {
    const db = await this.getDb();
    const coll = db.collection(collection);
    const updateData = { $set: data };
    return manyData(data) ? coll.updateMany(query, updateData) : coll.updateOne(query, updateData);
  }

  async delete(collection: string, query: any): Promise<any> {
    const db = await this.getDb();
    return db.collection(collection).deleteMany(query);
  }
}
