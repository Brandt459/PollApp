import React from 'react'
import ReactDOM from 'react-dom'
import trash from '../images/trash.svg'

class Polls extends React.Component {
    constructor() {
        super()
        this.state = {
            pollList: [],
            data: [],
            resultsStartIndex: 0,
            resultsEndIndex: 3,
            resultsPerRender: 3
        }
        this.loadPolls = this.loadPolls.bind(this)
        this.updatePoll = this.updatePoll.bind(this)
        this.pollVote = this.pollVote.bind(this)
        this.createPoll = this.createPoll.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
    }

    componentDidMount() {
        fetch('/api/poll-list/')
            .then(response => response.json())
            .then(data => {
                this.loadPolls(data)
                this.setState({ data: data })
            })
    }

    loadPolls(data) {
        this.setState((prevState) => ({
            pollList: prevState.pollList.concat(data.slice(prevState.resultsStartIndex, prevState.resultsEndIndex)),
            resultsStartIndex: prevState.resultsStartIndex + prevState.resultsPerRender,
            resultsEndIndex: prevState.resultsEndIndex + prevState.resultsPerRender
        }))
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
        fetch(`/api/update/${poll["id"]}/`, {
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
        fetch('/api/create-poll/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": e.target.querySelector("#form-title").value,
                "option1": e.target.querySelector("#form-option1").value,
                "option2": e.target.querySelector("#form-option2").value,
                "owner": localStorage.getItem('user')
            })
        })
            .then(response => response.json())
            .then(data => {
                this.setState(prevstate => {
                    return {
                        pollList: [...prevstate.pollList, data],
                        data: [...prevstate.data, data]
                    }
                })
            })
        e.target.reset()
    }

    
    deletePoll(e) {
        e.preventDefault()
        const index = ReactDOM.findDOMNode(e.target).parentNode.getAttribute("id")
        let poll = this.state.pollList[index]
        fetch(`/api/delete-poll/${poll["id"]}/`, {
            method: 'DELETE'
        })
        let polls = [...this.state.pollList]
        let data = polls
        polls.splice(index, 1)
        this.setState({
            pollList: polls,
            data: data
        })
    }
    
    render() {
        const pollList = this.state.pollList
        const data = this.state.data
        console.log(pollList, data)
        try {
            return (
                <div>
                    {localStorage.getItem('token') ?
                        <div className="poll-create">
                            <h1>Create a poll: </h1>
                            <form onSubmit={this.createPoll} id="poll-form">
                                <input style={{ flex: 3 }} type="text" id="form-title" required placeholder="Title" />
                                <input style={{ flex: 3 }} type="text" id="form-option1" required placeholder="Option 1" />
                                <input style={{ flex: 3 }} type="text" id="form-option2" required placeholder="Option 2" />
                                <input style={{ flex: 1 }} type="submit" id="form-submit" className="poll-submit" placeholder="Submit" />
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
                        {!(pollList.length === data.length) &&
                            <button className="load-polls" onClick={() => this.loadPolls(data)}><i class="arrow-down" /></button>
                        }
                    </div>
                </div >
            )
        } catch {
            return <h1>Loading...</h1>
        }
    }
}



export default Polls;
