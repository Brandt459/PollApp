import React from 'react'
import ReactDOM from 'react-dom'

class Polls extends React.Component {
  constructor() {
    super()
    this.state = {
      pollList: null,
    }
    this.updatePoll = this.updatePoll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/poll-list/')
      .then(response => response.json())
      .then(data =>
        this.setState({ pollList: data }))
  }

  updatePoll(e) {
    e.preventDefault()
    const index = ReactDOM.findDOMNode(e.target).parentNode.parentNode.getAttribute("id")
    let poll = this.state.pollList[index]
    poll[e.target.name] = poll[e.target.name] + 1
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
          pollList: polls
        })
      })
  }

  handleClick(e) {
    this.updatePoll(e)
    e.target.classList.add("active")
    console.log(e.target.nextElementSibling)
    ReactDOM.findDOMNode(e.target).parentNode.parentNode.classList.add("voted")
    const buttons = ReactDOM.findDOMNode(e.target).parentNode.querySelectorAll('button')
    buttons.forEach(button => button.disabled = true)
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/api/create-poll/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": e.target.querySelector("#form-title").value,
        "option1": e.target.querySelector("#form-option1").value,
        "option2": e.target.querySelector("#form-option2").value
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          pollList: [...this.state.pollList, data]
        })
      })
  }

  render() {
    const pollList = this.state.pollList
    try {
      return (
        <div>
          {!localStorage.getItem('token') &&
            <div className="login-statement">
              <h1>Log in to vote and create polls</h1>
            </div>
          }
          {localStorage.getItem('token') &&
            <div className="poll-create">
              <h1>Create a poll: </h1>
              <form onSubmit={this.handleSubmit} className="poll-form">
                <input style={{ flex: 3 }} type="text" id="form-title" placeholder="Create a poll" />
                <input style={{ flex: 3 }} type="text" id="form-option1" placeholder="Option 1" />
                <input style={{ flex: 3 }} type="text" id="form-option2" placeholder="Option 2" />
                <input style={{ flex: 1 }} type="submit" id="form-submit" placeholder="Submit" />
              </form>
            </div>
          }
          <div className="polls">
            {pollList.map(poll => {
              return (
                <div className="poll" id={pollList.indexOf(poll)}>
                  <h1 className="poll-title">{poll["title"]}</h1>
                  <div className="poll-options">
                    <button onClick={this.handleClick} name="option1total" className="poll-button" disabled={!localStorage.getItem('token')}>{poll["option1"]}</button>
                    <button onClick={this.handleClick} name="option2total" className="poll-button" disabled={!localStorage.getItem('token')}>{poll["option2"]}</button>
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
