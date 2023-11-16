import React, { useState } from 'react';
import axios from 'axios';

const PasswordGenerationPage = () => {
    const [password, setPassword] = useState('');

    const generatePassword = async () => {
        try {
            const res = await axios.get('/api/passwords/generate');
            setPassword(res.data.password);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div id="passwordGeneration">
            <h2>Password Generation</h2>
            <button onClick={generatePassword}>Generate Password</button>
            {password && <p>Your generated password is: {password}</p>}
        </div>
    );
};

export default PasswordGenerationPage;