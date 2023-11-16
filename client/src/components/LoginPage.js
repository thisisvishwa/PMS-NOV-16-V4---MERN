```javascript
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const authenticateUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/users/login', { email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                window.location = '/dashboard';
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form id="loginForm" onSubmit={authenticateUser}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;
```