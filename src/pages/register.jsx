import React from 'react'
import Navbar from '../components/Navbar'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            redirect: false,
            error: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', jwt_decode(data.token)["username"])
                    fetch('http://127.0.0.1:8000/api/user_id/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "username": localStorage.getItem('user') })
                    })
                        .then(response => response.json())
                        .then(data => localStorage.setItem('userId', data))
                    this.setState({ redirect: true })
                } else {
                    this.setState({ error: true })
                }
            })
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return (
                <div>
                    <Navbar />
                    <div className="register-container">
                        <h1>REGISTER</h1>
                        {this.state.error &&
                            <h2 className="register-error">Username already exists!</h2>
                        }
                        <div className="form-container">
                            <form onSubmit={this.handleSubmit} className="register-form">
                                <input type="text" name="username" onChange={this.handleChange} placeholder="Username" />
                                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                                <div className="register-form-submit">
                                    <input type="submit" value="REGISTER" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Register