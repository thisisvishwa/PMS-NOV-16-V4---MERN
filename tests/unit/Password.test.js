```javascript
const assert = require('assert');
const Password = require('../server/models/Password');

describe('Password Model', () => {
    it('should create a new password', (done) => {
        const passwordData = {
            userId: '1234567890',
            password: 'password123',
            dateOfCreation: new Date(),
            dateOfLastUpdate: new Date()
        };

        const password = new Password(passwordData);

        password.save((err) => {
            if (err) done(err);
            else done();
        });
    });

    it('should retrieve a password', (done) => {
        Password.findOne({ userId: '1234567890' }, (err, password) => {
            if (err) done(err);
            else {
                assert.equal(password.password, 'password123');
                done();
            }
        });
    });

    it('should update a password', (done) => {
        Password.findOneAndUpdate({ userId: '1234567890' }, { password: 'newPassword123' }, (err, password) => {
            if (err) done(err);
            else {
                assert.equal(password.password, 'newPassword123');
                done();
            }
        });
    });

    it('should delete a password', (done) => {
        Password.findOneAndDelete({ userId: '1234567890' }, (err) => {
            if (err) done(err);
            else done();
        });
    });
});
```