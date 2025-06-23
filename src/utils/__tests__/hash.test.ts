import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../hash';

describe('Password Hashing', () => {
  it('should hash and match password correctly', async () => {
    const raw = 'supersecret';
    const numHashRounds = 12;
    const hash = await hashPassword(raw, numHashRounds);
    expect(hash).not.toBe(raw);

    const isValid = await comparePassword(raw, hash);
    expect(isValid).toBe(true);
  });

  it('should fail on incorrect password', async () => {
    const hash = await hashPassword('supersecret', 12);
    const isValid = await comparePassword('wrong', hash);
    expect(isValid).toBe(false);
  });
});
