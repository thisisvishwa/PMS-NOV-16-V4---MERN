```javascript
const request = require('supertest');
const app = require('../../server/index.js');

describe('End-to-End Test for Password Management System', () => {
    let testUser = {
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'Test@123'
    };

    let testPassword = {
        password: 'TestPassword@123'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send(testUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        testUser = res.body.user;
    });

    it('should authenticate the user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: testUser.email, password: testUser.password });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should store a new password', async () => {
        const res = await request(app)
            .post('/api/passwords/store')
            .send(testPassword);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('password');
        testPassword = res.body.password;
    });

    it('should retrieve the stored password', async () => {
        const res = await request(app)
            .get(`/api/passwords/${testPassword._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('password');
    });

    it('should update the stored password', async () => {
        const res = await request(app)
            .put(`/api/passwords/${testPassword._id}`)
            .send({ password: 'UpdatedPassword@123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('password');
    });

    it('should delete the stored password', async () => {
        const res = await request(app)
            .delete(`/api/passwords/${testPassword._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Password deleted successfully');
    });
});
```