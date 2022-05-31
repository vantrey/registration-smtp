import { Collection } from 'mongodb';
import { IFindUserPayload, IUser } from '../types/usersTypres';
import { usersCollection } from '../helpers/db';

export class RegistrationRepository {
  constructor(private usersCollection: Collection<IUser>) {}

  createUser = async (newUser: IUser): Promise<boolean> => {
    const result = await this.usersCollection.insertOne(newUser, { forceServerObjectId: true });

    return result.acknowledged;
  };

  fineUserByLoginOrEmail = async (payload: IFindUserPayload): Promise<IUser | null> => {
    const { login, email } = payload;
    const result = await this.usersCollection.findOne(
      { $or: [{ login }, { email }] },
      { projection: { _id: 0 } }
    );

    return result;
  };

  getUserByLogon = async (login: string): Promise<IUser | null> => {
    return await this.usersCollection.findOne({ login });
  };
}

export const registrationRepository = new RegistrationRepository(usersCollection);
