import { ObjectId } from 'mongodb';

export interface IUser {
  id: ObjectId;
  email: string;
  login: string;
  password: string;
  isConfirmed: boolean;
}

export type UserPayloadType = Omit<IUser, 'id' | 'isConfirmed'>;

export interface IFindUserPayload {
  login: string;
  email: string;
}
