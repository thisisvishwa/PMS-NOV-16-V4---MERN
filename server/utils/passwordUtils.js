const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

const passwordUtils = {};

passwordUtils.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

passwordUtils.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

passwordUtils.encryptPassword = (password) => {
    const cipher = crypto.createCipher('aes-256-cbc', 'encryptionKey');
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

passwordUtils.decryptPassword = (encryptedPassword) => {
    const decipher = crypto.createDecipher('aes-256-cbc', 'encryptionKey');
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = passwordUtils;