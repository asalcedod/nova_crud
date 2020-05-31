import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            lastname: "",
            age: "",
            password: ""
        }
        this.registerUser = this.registerUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    registerUser(e) {
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
            M.toast({html: 'User Saved'})
            this.setState({
                name: '',
                lastname: '',
                age: '',
                password: '',
                _id: '',
                users: []
            })
        })
        .catch(err => console.error(err))
        e.preventDefault()
    }

    handleChange(e) {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <nav className = "blue-grey darken-1">
                    <div className = "container">
                        <a className = "brand-logo" href="">Nova - CRUD</a>
                    </div>
                </nav>
                <div className = "container">
                    <div className = "row">
                        <div className = "col s3">
                            <div className = "card">
                                <div className = "card-content">
                                    <form onSubmit = {this.registerUser}>
                                        <div className = "row">
                                            <div className = "input-field col s12">
                                                <input name = "name" onChange = {this.handleChange} type = "text" placeholder = "Name" value = {this.state.name}></input>
                                                <input name = "lastname" onChange = {this.handleChange} type = "text" placeholder = "Lastname" value = {this.state.lastname}></input>
                                                <input name = "age" onChange = {this.handleChange} type = "text" placeholder = "Age" value = {this.state.age}></input>
                                                <input name = "password" onChange = {this.handleChange} type = "password" placeholder = "Password"value = {this.state.password}></input>
                                            </div>
                                        </div>
                                        <button type = "submit" className = "btn blue-grey darken-1">Register</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className = "col s9">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App