import {
  registrationRepository,
  RegistrationRepository,
} from '../repositories/registration-repository';
import { IFindUserPayload, IUser, UserPayloadType } from '../types/usersTypres';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { usersCollection } from '../helpers/db';

class AuthorizationService {
  constructor(private repository: RegistrationRepository) {}

  registration = async (payload: UserPayloadType): Promise<boolean> => {
    const { password, login, email } = payload;

    const passwordHash = await this.generateHash(password);
    const id = new ObjectId();

    return await this.repository.createUser({
      password: passwordHash,
      email,
      login,
      id,
      isConfirmed: false,
    });
  };

  getUserByLoginOrEmail = async (payload: IFindUserPayload): Promise<IUser | null> => {
    return await this.repository.fineUserByLoginOrEmail(payload);
  };

  checkLoginOrEmailExist = async (payload: IFindUserPayload) => {
    const result = await this.getUserByLoginOrEmail(payload);
    let existingField = '';

    if (result) {
      existingField = result.email === payload.email ? 'email' : 'login';
    }

    return {
      isExist: !!result,
      existingField,
    };
  };

  generateHash = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  checkIsPasswordCorrect = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };
}

export const authorizationService = new AuthorizationService(registrationRepository);
