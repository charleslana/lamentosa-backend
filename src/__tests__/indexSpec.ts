import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test basic and point server', () => {
  it('Get the / end point', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
