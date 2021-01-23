import React from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode"

class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            loggedIn: localStorage.getItem('token') ? true : false,
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            const token = localStorage.getItem('token')
            const decodedToken = jwt_decode(token)
            this.setState({ username: decodedToken["username"] })
        }
    }

    handleLogout() {
        localStorage.removeItem('token')
        this.setState({
            loggedIn: false,
            username: null,
        })
    }

    render() {
        const username = this.state.username
        return (
            <nav>
                <Link to="/">Home</Link>
                {username ?
                    <ul>
                        <li>{username}</li>
                        <li onClick={this.handleLogout}><Link>Log out</Link></li>
                    </ul>
                    :

                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Log in</Link></li>
                    </ul>
                }
            </nav>
        )
    }
}

export default Navbar