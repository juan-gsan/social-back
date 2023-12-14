import jwt from 'jsonwebtoken';
import { secret } from '../config.js';
import { compare, hash } from 'bcrypt';

export type PayloadToken = {
  userId: string;
  email: string;
} & jwt.JwtPayload;

export class AuthServices {
  private static salt = 10;

  static createJWT(payload: PayloadToken) {
    const token = jwt.sign(payload, secret!);
    return token;
  }

  static verifyJWT(token: string) {
    try {
      const result = jwt.verify(token, secret!);
      if (typeof result === 'string') {
        throw new Error('498 Invalid Token ' + result);
      }

      return result as PayloadToken;
    } catch (error) {
      throw new Error('498 Invalid Token ' + error);
    }
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
