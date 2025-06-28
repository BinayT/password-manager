import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app/index';


describe('Authentication Middleware', () => {
  it('should block requests with no token', async () => {
    const res = await request(app).get('/api/user/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('No token provided');
  });
});
