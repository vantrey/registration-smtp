import {
  registrationRepository,
  RegistrationRepository,
} from '../repositories/registration-repository';
import { FindUserPayloadType, IUser, UserPayloadType } from '../types/usersTypes';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { jwtUtility } from '../helpers/jwt-utility';

class AuthorizationService {
  constructor(private repository: RegistrationRepository) {}

  registration = async (payload: UserPayloadType): Promise<IUser | null> => {
    const { password, login, email } = payload;

    const passwordHash = await this.generateHash(password);
    const id = new ObjectId();
    const code = uuidv4();

    const createdUser = await this.repository.createUser({
      password: passwordHash,
      email,
      login,
      id,
      isConfirmed: false,
      code,
    });

    return createdUser;
  };

  confirmRegistration = async (code: string): Promise<boolean> => {
    return await this.repository.setRegistrationConfirmed(code);
  };

  getUserByLoginOrEmail = async (payload: FindUserPayloadType): Promise<IUser | null> => {
    return await this.repository.fineUserByLoginOrEmail(payload);
  };

  checkLoginOrEmailExist = async (payload: FindUserPayloadType) => {
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

  authorizeUser = async (login: string, password: string): Promise<string | null> => {
    const user = await this.getUserByLoginOrEmail({ login });
    console.log('servise', user);
    if (!user || !user.isConfirmed) {
      return null;
    }

    const isPasswordCorrect = await this.checkIsPasswordCorrect(password, user.password);
    console.log('isPasswordCorrect ', isPasswordCorrect);
    if (!isPasswordCorrect) {
      return null;
    }

    return await jwtUtility.createJWT(user.id);
  };

  updateUserCode = async (email: string): Promise<string | null> => {
    const code = uuidv4();
    return this.repository.updateUserCode(email, code);
  };

  generateHash = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  checkIsPasswordCorrect = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };
}

export const authorizationService = new AuthorizationService(registrationRepository);
