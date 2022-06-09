import { Collection, WithId } from 'mongodb';
import { FindUserPayloadType, IUser } from '../types/usersTypes';
import { ipListCollection, usersCollection } from '../helpers/runDb';
import { IIpData, IUpdateIpData } from '../types/ipListTypes';

export class IpListRepository {
  constructor(private ipListCollection: Collection<IIpData>) {}

  setIP = async (payload: IUpdateIpData): Promise<boolean> => {
    const result = await this.ipListCollection.insertOne({
      ...payload,
      requestDate: new Date(),
      bannedDate: null,
      relativeAttemptCount: 1,
    });

    return result.acknowledged;
  };

  updateAttemptCount = async (payload: IUpdateIpData, relativeAttemptCount: number) => {
    const result = await this.ipListCollection.updateOne(payload, {
      $set: { relativeAttemptCount },
    });

    return result.acknowledged;
  };

  resetIpData = async (payload: IUpdateIpData) => {
    const result = await this.ipListCollection.updateOne(payload, {
      $set: { bannedDate: null, requestDate: new Date(), relativeAttemptCount: 1 },
    });

    return result.acknowledged;
  };

  setBannedDate = async (payload: IUpdateIpData) => {
    const result = await this.ipListCollection.updateOne(payload, {
      $set: { bannedDate: new Date() },
    });

    return result.acknowledged;
  };

  findIP = async (ip: string, endpoint: string): Promise<WithId<IIpData> | null> => {
    const result = await this.ipListCollection.findOne({ ip, endpoint });

    return result;
  };
}

export const ipListRepository = new IpListRepository(ipListCollection);
