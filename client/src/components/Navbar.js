import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/password-management">Password Management</Link>
                </li>
                <li>
                    <Link to="/password-reset">Password Reset</Link>
                </li>
                <li>
                    <Link to="/password-generation">Password Generation</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;