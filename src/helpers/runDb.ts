import { MongoClient } from 'mongodb';
import { IUser } from '../types/usersTypes';
import { settings } from '../settings';

const mongoUri = settings.MONGO_URI;

export const client = new MongoClient(mongoUri);
const connection = client.db('lessons');

export const usersCollection = connection.collection<IUser>('usersHW5');
export const ipListCollection = connection.collection<IUser>('ipListHW5');

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('lessons').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
