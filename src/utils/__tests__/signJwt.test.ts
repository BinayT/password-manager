import { describe, it, expect } from 'vitest';
import { generateToken } from '../signJwt';

describe('JWT Token Generation', () => {
  it('should generate a valid JWT token correctly.', () => {
    const jwtToken = generateToken({userId: 123})
    expect(jwtToken).not.toBe(null);
    expect(jwtToken).toBeTypeOf('string');
    expect(jwtToken.split('.')).toHaveLength(3);
  });
  
});
