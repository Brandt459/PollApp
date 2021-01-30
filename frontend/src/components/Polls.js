import React from 'react'
import ReactDOM from 'react-dom'
import trash from '../images/trash.svg'

class Polls extends React.Component {
    constructor() {
        super()
        this.state = {
            pollList: null,
        }
        this.fetchPollList = this.fetchPollList.bind(this)
        this.updatePoll = this.updatePoll.bind(this)
        this.pollVote = this.pollVote.bind(this)
        this.createPoll = this.createPoll.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
    }

    componentDidMount() {
        this.fetchPollList()
    }

    fetchPollList() {
        fetch('http://127.0.0.1:8000/api/poll-list/')
            .then(response => response.json())
            .then(data =>
                this.setState({ pollList: data }))
    }

    updatePoll(e) {
        e.preventDefault()
        const index = ReactDOM.findDOMNode(e.target).parentNode.parentNode.getAttribute("id")
        let poll = this.state.pollList[index]
        const userId = parseInt(localStorage.getItem('userId'))
        poll[e.target.name] = poll[e.target.name] + 1
        poll["votes"].push(userId)
        if (e.target.name === 'option1total') {
            poll["option1votes"].push(userId)
        } else {
            poll["option2votes"].push(userId)
        }
        fetch(`http://127.0.0.1:8000/api/update/${poll["id"]}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(poll)
        })
            .then(response => response.json())
            .then(data => {
                let polls = [...this.state.pollList]
                polls[index] = data
                this.setState({
                    pollList: polls,
                    formError: false,
                })
            })
    }

    pollVote(e) {
        this.updatePoll(e)
        e.target.classList.add("active")
        ReactDOM.findDOMNode(e.target).parentNode.parentNode.classList.add("voted")
        const buttons = ReactDOM.findDOMNode(e.target).parentNode.querySelectorAll('button')
        buttons.forEach(button => button.disabled = true)
    }

    createPoll(e) {
        e.preventDefault()
        const title = e.target.querySelector("#form-title").value
        const option1 = e.target.querySelector("#form-option1").value
        const option2 = e.target.querySelector("#form-option2").value
        this.setState({ formError: false })
        if (title && option1 && option2) {
            fetch('http://127.0.0.1:8000/api/create-poll/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "title": title,
                    "option1": option1,
                    "option2": option2,
                    "owner": localStorage.getItem('user')
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        pollList: [...this.state.pollList, data]
                    })
                })
        } else {
            this.setState({ formError: true })
        }
        e.target.reset()
    }

    deletePoll(e) {
        e.preventDefault()
        const index = ReactDOM.findDOMNode(e.target).parentNode.getAttribute("id")
        let poll = this.state.pollList[index]
        fetch(`http://127.0.0.1:8000/api/delete-poll/${poll["id"]}/`, {
            method: 'DELETE'
        })
        let polls = [...this.state.pollList]
        polls.splice(index, 1)
        this.setState({
            pollList: polls
        })
    }

    render() {
        const pollList = this.state.pollList
        try {
            return (
                <div>
                    {localStorage.getItem('token') ?
                        this.state.formError ?
                            <div className="poll-create">
                                <h1 className="form-error">Invalid form, please fill all fields</h1>
                                <h1>Create a poll: </h1>
                                <form onSubmit={this.createPoll} id="poll-form">
                                    <input style={{ flex: 3 }} type="text" id="form-title" placeholder="Title" />
                                    <input style={{ flex: 3 }} type="text" id="form-option1" placeholder="Option 1" />
                                    <input style={{ flex: 3 }} type="text" id="form-option2" placeholder="Option 2" />
                                    <input style={{ flex: 1 }} type="submit" id="form-submit" placeholder="Submit" />
                                </form>
                            </div>
                            :
                            <div className="poll-create">
                                <h1>Create a poll: </h1>
                                <form onSubmit={this.createPoll} id="poll-form">
                                    <input style={{ flex: 3 }} type="text" id="form-title" placeholder="Title" />
                                    <input style={{ flex: 3 }} type="text" id="form-option1" placeholder="Option 1" />
                                    <input style={{ flex: 3 }} type="text" id="form-option2" placeholder="Option 2" />
                                    <input style={{ flex: 1 }} type="submit" id="form-submit" placeholder="Submit" />
                                </form>
                            </div>
                        :
                        <div className="login-statement">
                            <h1>Log in to vote and create polls</h1>
                        </div>
                    }
                    <div className="polls">
                        {pollList.map(poll => {
                            const userId = parseInt(localStorage.getItem('userId'))
                            const user = localStorage.getItem('user')
                            return (
                                <div className={`poll ${poll["votes"].includes(userId) ? "voted" : ""} ${poll["owner"] === user ? "owned" : ""}`} id={pollList.indexOf(poll)}>
                                    <h1 className="poll-title">{poll["title"]}</h1>
                                    {poll["owner"] === user &&
                                        <img src={trash} alt="trash" className="trash-icon" onClick={this.deletePoll} />
                                    }
                                    <div className="poll-options">
                                        <button onClick={this.pollVote} name="option1total" className={`poll-button ${poll["option1votes"].includes(userId) ? "active" : ""}`} disabled={!localStorage.getItem('token') || poll["votes"].includes(userId)}>{poll["option1"]}</button>
                                        <button onClick={this.pollVote} name="option2total" className={`poll-button ${poll["option2votes"].includes(userId) ? "active" : ""}`} disabled={!localStorage.getItem('token') || poll["votes"].includes(userId)}>{poll["option2"]}</button>
                                    </div>
                                    <div className="poll-results">
                                        <p>Total votes: </p>
                                        <div className="votes-container">
                                            <div className="votes">
                                                <p>{poll["option1total"]}</p>
                                                <p>{poll["option2total"]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div >
            )
        } catch {
            return <h1>Loading...</h1>
        }
    }
}



export default Polls;
