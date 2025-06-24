import { describe, it, expect } from 'vitest';
import { signJwt, verifyJWT } from '../signJwt';

describe('JWT Token Generation', () => {
  it('should generate a valid JWT token correctly.', () => {
    const jwtToken = signJwt({userId: '123'})
    expect(jwtToken).not.toBe(null);
    expect(jwtToken).toBeTypeOf('string');
    expect(jwtToken.split('.')).toHaveLength(3);
  });
  
  it('should verify and decode a valid token', () => {
    const payload = { userId: 'abc123' };
    const token = signJwt(payload);
    const decoded = verifyJWT(token) as any;

    expect(decoded).toMatchObject(payload);
    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
  });

  it('should return null for invalid token', () => {
    const result = verifyJWT('this.is.invalid.token');
    expect(result).toBeNull();
  });
});
