```javascript
const request = require('supertest');
const app = require('../../server/index.js');
const { User, Password } = require('../../server/models');

describe('Password Routes', () => {
    let user;
    let password;

    beforeAll(async () => {
        user = await User.create({ name: 'Test User', email: 'test@test.com', password: 'password123' });
        password = await Password.create({ userId: user._id, password: 'password123' });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Password.deleteMany({});
    });

    test('POST /passwords', async () => {
        const response = await request(app)
            .post('/passwords')
            .send({ userId: user._id, password: 'newpassword123' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('PASSWORD_STORE_SUCCESS');
    });

    test('GET /passwords', async () => {
        const response = await request(app)
            .get(`/passwords/${user._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('PASSWORD_RETRIEVE_SUCCESS');
    });

    test('PUT /passwords', async () => {
        const response = await request(app)
            .put(`/passwords/${password._id}`)
            .send({ password: 'updatedpassword123' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('PASSWORD_UPDATE_SUCCESS');
    });

    test('DELETE /passwords', async () => {
        const response = await request(app)
            .delete(`/passwords/${password._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('PASSWORD_DELETE_SUCCESS');
    });
});
```