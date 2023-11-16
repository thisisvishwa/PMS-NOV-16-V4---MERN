```javascript
const request = require('supertest');
const app = require('../../server/index.js');
const User = require('../../server/models/User.js');

describe('User Registration and Authentication', () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'Test@123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'REGISTER_SUCCESS');
  });

  test('should authenticate a user', async () => {
    const user = new User({
      name: 'Test User',
      email: 'testuser@gmail.com',
      password: 'Test@123'
    });
    await user.save();

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@gmail.com',
        password: 'Test@123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'LOGIN_SUCCESS');
  });
});
```