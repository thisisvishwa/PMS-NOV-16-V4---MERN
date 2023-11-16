```javascript
import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwords: []
        };
    }

    componentDidMount() {
        axios.get('/api/passwords')
            .then(response => {
                this.setState({ passwords: response.data });
            })
            .catch(error => {
                console.error('Error retrieving passwords:', error);
            });
    }

    render() {
        return (
            <div id="dashboard">
                <h2>Your Passwords</h2>
                <ul>
                    {this.state.passwords.map((password, index) => (
                        <li key={index}>
                            <p>Password: {password.password}</p>
                            <p>Date of creation: {new Date(password.dateOfCreation).toLocaleDateString()}</p>
                            <p>Last update: {new Date(password.dateOfLastUpdate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Dashboard;
```