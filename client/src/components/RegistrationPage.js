import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', { name, email, password });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form id="registerForm" onSubmit={registerUser}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Register" />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationPage;