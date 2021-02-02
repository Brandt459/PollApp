import React from 'react'
import Navbar from '../components/Navbar'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            loggedin: false,
            error: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('/api/token-auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            })
        })
            .then(response => response.json())
            .then(data => {
                try {
                    if (data.user.username) {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user.username)
                        fetch('/api/user_id/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ "username": localStorage.getItem('user') })
                        })
                            .then(response => response.json())
                            .then(data => {
                                localStorage.setItem('userId', data)
                            })
                        this.setState({ loggedin: true })
                    }
                } catch {
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
        if (this.state.loggedin) {
            return <Redirect to='/' />
        } else {
            return (
                <div>
                    <Navbar />
                    <div className="register-container">
                        <h1>LOG IN</h1>
                        {this.state.error &&
                            <h2 className="register-error">Invalid credentials!</h2>
                        }
                        <div className="form-container">
                            <form onSubmit={this.handleSubmit} className="register-form">
                                <input type="text" name="username" onChange={this.handleChange} placeholder="Username" />
                                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                                <div className="register-form-submit">
                                    <input type="submit" value="LOG IN" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Login