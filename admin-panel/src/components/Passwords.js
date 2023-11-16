import React, { Component } from 'react';
import axios from 'axios';

class Passwords extends Component {
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
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>Passwords</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Password</th>
                            <th>Date of Creation</th>
                            <th>Date of Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.passwords.map(password => (
                            <tr key={password._id}>
                                <td>{password.userId}</td>
                                <td>{password.password}</td>
                                <td>{new Date(password.dateOfCreation).toLocaleDateString()}</td>
                                <td>{new Date(password.dateOfLastUpdate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Passwords;