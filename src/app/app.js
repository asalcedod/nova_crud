import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {

    constructor() {
        super()
        this.state = {
            _id: "",
            name: "",
            lastname: "",
            age: "",
            password: "",
            users: []
            
        }
        this.registerUser = this.registerUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    registerUser(e) {
        e.preventDefault()
        if(this.state._id) {
            fetch(`api/users/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    lastname: this.state.lastname,
                    age: this.state.age,
                    password: this.state.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'User Updated' })
                    this.setState({
                        _id: '',
                        name: '',
                        lastname: '',
                        age: '',
                        password: ''
                    })
                    this.fetchUsers();
                })
                .catch(err => console.error(err))
        } else {
            fetch('api/users', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'User Saved' })
                    this.setState({
                        name: '',
                        lastname: '',
                        age: '',
                        password: ''
                    })
                    this.fetchUsers();
                })
                .catch(err => console.error(err))
        }
    }

    deleteUser(id) {
        if (confirm('Are you sure that you want to delete this user?')) {
            fetch(`api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'User deleted' })
                    this.fetchUsers()
                });
        }
    }

    editUser(id) {
        fetch(`api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    _id: data._id,
                    name: data.name,
                    lastname: data.lastname,
                    age: data.age,
                    password: data.password
                });
            });
    }

    fetchUsers() {
        fetch('api/users')
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data })
            });
    }

    componentDidMount() {
        this.fetchUsers()
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <nav className="blue-grey darken-1">
                    <div className="container">
                        <a className="brand-logo" href="">Nova - CRUD</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s3">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.registerUser}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Name" value={this.state.name}></input>
                                                <input name="lastname" onChange={this.handleChange} type="text" placeholder="Lastname" value={this.state.lastname}></input>
                                                <input name="age" onChange={this.handleChange} type="text" placeholder="Age" value={this.state.age}></input>
                                                <input name="password" onChange={this.handleChange} type="password" placeholder="Password" value={this.state.password}></input>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn blue-grey darken-1">Register</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s9">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Lastname</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(user => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.lastname}</td>
                                                    <td>{user.age}</td>
                                                    <td>
                                                        <button onClick={() => this.deleteUser(user._id)} className="btn blue-grey darken-1">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editUser(user._id)} className="btn blue-grey darken-1" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App