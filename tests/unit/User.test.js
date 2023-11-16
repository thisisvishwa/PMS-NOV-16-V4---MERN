```javascript
const User = require('../../server/models/User');
const mongoose = require('mongoose');
const assert = require('assert');

describe('User Model Test', () => {

    before((done) => {
        mongoose.connect('mongodb://localhost/testDatabase');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            done();
        });
    });

    it('Create and save user successfully', async () => {
        const userData = {name: 'Test User', email: 'testuser@gmail.com', password: 'testpassword'};
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        assert(savedUser._id !== null);
        assert(savedUser.name === userData.name);
        assert(savedUser.email === userData.email);
        assert(savedUser.password === userData.password);
    });

    it('Update user successfully', async () => {
        const userData = {name: 'Test User', email: 'testuser@gmail.com', password: 'testpassword'};
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        savedUser.name = 'Updated Test User';
        const updatedUser = await savedUser.save();

        assert(updatedUser._id !== null);
        assert(updatedUser.name !== userData.name);
        assert(updatedUser.email === userData.email);
        assert(updatedUser.password === userData.password);
    });

    it('Delete user successfully', async () => {
        const userData = {name: 'Test User', email: 'testuser@gmail.com', password: 'testpassword'};
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        const deletedUser = await User.findByIdAndDelete(savedUser._id);

        assert(deletedUser._id !== null);
        assert(deletedUser.name === userData.name);
        assert(deletedUser.email === userData.email);
        assert(deletedUser.password === userData.password);
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});
```