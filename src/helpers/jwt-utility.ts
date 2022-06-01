import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { settings } from '../settings';

export const jwtUtility = {
  async createJWT(userId: ObjectId) {
    const res = jwt.sign({ userId: userId.toString() }, settings.JWT_SECRET, {
      expiresIn: '1 day',
    });
    console.log(res);
    return res;
  },

  async extractUserIdFromToken(token: string): Promise<ObjectId | null> {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);

      return new ObjectId(result.userId);
    } catch (error) {
      return null;
    }
  },
};
