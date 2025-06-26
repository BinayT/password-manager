import jwt from 'jsonwebtoken';
import { User } from '../types/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const JWT_EXPIRES_IN = '1h';

export function signJwt(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT<T = any>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as T;
    return decoded;
  } catch (error) {
    console.warn('Invalid JWT:', error);
    return null;
  }
}