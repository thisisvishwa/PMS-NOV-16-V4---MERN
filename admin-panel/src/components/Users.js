```javascript
import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }

    deleteUser = (id) => {
        axios.delete(`/api/users/${id}`)
            .then(response => {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user._id !== id)
                }));
            })
            .catch(error => {
                console.error('Error deleting user', error);
            });
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => this.deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users;
```