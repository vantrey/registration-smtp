import { Collection } from 'mongodb';
import { FindUserPayloadType, IUser } from '../types/usersTypes';
import { usersCollection } from '../helpers/runDb';

export class RegistrationRepository {
  constructor(private usersCollection: Collection<IUser>) {}

  createUser = async (newUser: IUser): Promise<IUser | null> => {
    const result = await this.usersCollection.insertOne(newUser, { forceServerObjectId: true });

    return result.acknowledged ? newUser : null;
  };

  fineUserByLoginOrEmail = async (payload: FindUserPayloadType): Promise<IUser | null> => {
    const { login, email } = payload;
    const filterParameters = [];

    if (login) {
      filterParameters.push({ login });
    }
    if (email) {
      filterParameters.push({ email });
    }

    const filter = { $or: filterParameters.length ? filterParameters : [{}] };

    return await this.usersCollection.findOne(filter, { projection: { _id: 0 } });
  };

  getUserByLogin = async (login: string): Promise<IUser | null> => {
    return await this.usersCollection.findOne({ login });
  };

  setRegistrationConfirmed = async (code: string): Promise<boolean> => {
    const result = await this.usersCollection.updateOne({ code }, { $set: { isConfirmed: true } });

    return result.modifiedCount === 1;
  };

  updateUserCode = async (email: string, code: string): Promise<string | null> => {
    const result = await this.usersCollection.updateOne({ email }, { $set: { code } });

    return result.modifiedCount === 1 ? code : null;
  };
}

export const registrationRepository = new RegistrationRepository(usersCollection);
