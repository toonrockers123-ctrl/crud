const request = require('supertest');
const app = require('../app');

describe('Health Check', () => {
  it('should return 200 and success status', async () => {
    const res = await request(app)
      .get('/health')
      .expect(200);
    
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Server is running');
  });
});
