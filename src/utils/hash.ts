import bcrypt from 'bcryptjs';

export async function hashPassword(password: string, hashAmount: number): Promise<string> {
  return bcrypt.hash(password, hashAmount);
}

export async function comparePassword(raw: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(raw, hashed);
}
