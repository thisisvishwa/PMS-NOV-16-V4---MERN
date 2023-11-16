```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordManagementPage = () => {
    const [passwords, setPasswords] = useState([]);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const getPasswords = async () => {
        const res = await axios.get('/api/passwords');
        setPasswords(res.data);
    }

    const updatePassword = async () => {
        if (selectedPassword) {
            const res = await axios.put(`/api/passwords/${selectedPassword._id}`, { password: newPassword });
            if (res.data.success) {
                getPasswords();
            }
        }
    }

    const deletePassword = async () => {
        if (selectedPassword) {
            const res = await axios.delete(`/api/passwords/${selectedPassword._id}`);
            if (res.data.success) {
                getPasswords();
            }
        }
    }

    return (
        <div id="passwordManagement">
            <h2>Password Management</h2>
            <div>
                <h3>Your Passwords</h3>
                <button onClick={getPasswords}>Refresh</button>
                <ul>
                    {passwords.map(password => (
                        <li key={password._id} onClick={() => setSelectedPassword(password)}>
                            {password.password}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedPassword && (
                <div>
                    <h3>Selected Password</h3>
                    <p>{selectedPassword.password}</p>
                    <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <button onClick={updatePassword}>Update</button>
                    <button onClick={deletePassword}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default PasswordManagementPage;
```