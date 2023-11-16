```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Password = require('../models/Password');
const passwordUtils = require('../utils/passwordUtils');

// Store password
router.post('/store', auth, async (req, res) => {
    try {
        const password = new Password({
            userId: req.user.id,
            password: passwordUtils.hashPassword(req.body.password),
            dateOfCreation: Date.now(),
            dateOfLastUpdate: Date.now()
        });
        await password.save();
        res.json({ message: 'PASSWORD_STORE_SUCCESS' });
    } catch (err) {
        res.status(500).json({ message: 'PASSWORD_STORE_FAIL' });
    }
});

// Retrieve password
router.get('/retrieve/:id', auth, async (req, res) => {
    try {
        const password = await Password.findById(req.params.id);
        if (!password || password.userId !== req.user.id) {
            return res.status(404).json({ message: 'PASSWORD_RETRIEVE_FAIL' });
        }
        res.json(password);
    } catch (err) {
        res.status(500).json({ message: 'PASSWORD_RETRIEVE_FAIL' });
    }
});

// Update password
router.put('/update/:id', auth, async (req, res) => {
    try {
        const password = await Password.findById(req.params.id);
        if (!password || password.userId !== req.user.id) {
            return res.status(404).json({ message: 'PASSWORD_UPDATE_FAIL' });
        }
        password.password = passwordUtils.hashPassword(req.body.password);
        password.dateOfLastUpdate = Date.now();
        await password.save();
        res.json({ message: 'PASSWORD_UPDATE_SUCCESS' });
    } catch (err) {
        res.status(500).json({ message: 'PASSWORD_UPDATE_FAIL' });
    }
});

// Delete password
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const password = await Password.findById(req.params.id);
        if (!password || password.userId !== req.user.id) {
            return res.status(404).json({ message: 'PASSWORD_DELETE_FAIL' });
        }
        await password.remove();
        res.json({ message: 'PASSWORD_DELETE_SUCCESS' });
    } catch (err) {
        res.status(500).json({ message: 'PASSWORD_DELETE_FAIL' });
    }
});

module.exports = router;
```