import { Collection } from 'mongodb';
import { IUser } from '../types/usersTypes';
import { usersCollection } from '../helpers/runDb';

export class TestingRepository {
  constructor(private usersCollection: Collection<IUser>) {}

  clearAllData = async (): Promise<boolean> => {
    const result = await this.usersCollection.deleteMany({});

    return result.acknowledged;
  };
}

export const testingRepository = new TestingRepository(usersCollection);
