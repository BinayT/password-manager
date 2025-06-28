import { describe, it, expect } from 'vitest';
import { signJwt, verifyJWT } from '../signJwt';

describe('JWT Token Generation', () => {
  it('should generate a valid JWT token correctly.', () => {
    const user = {
      id: '123',
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      created_at: new Date(),
      updated_at: new Date()
    }
    const jwtToken = signJwt(user)
    expect(jwtToken).not.toBe(null);
    expect(jwtToken).toBeTypeOf('string');
    expect(jwtToken.split('.')).toHaveLength(3);
  });
  
  it('should verify and decode a valid token', () => {
    const user = {
      id: '123',
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      created_at: new Date(),
      updated_at: new Date()
    }
    const token = signJwt(user);
    const decoded = verifyJWT(token) as any;

    expect(decoded).toMatchObject(user);
    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
  });

  it('should return null for invalid token', () => {
    const result = verifyJWT('this.is.invalid.token');
    expect(result).toBeNull();
  });
});
