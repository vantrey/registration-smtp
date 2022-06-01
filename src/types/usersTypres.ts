import { ObjectId } from 'mongodb';

export interface IUser {
  id: ObjectId;
  email: string;
  login: string;
  password: string;
  isConfirmed: boolean;
  code: string;
}

export type UserPayloadType = Omit<IUser, 'id' | 'isConfirmed' | 'code'>;

interface IFindUserPayload {
  login: string;
  email: string;
}

export type FindUserPayloadType = Partial<IFindUserPayload>;
