import React from 'react'
import serverConfig from '../../config/server'


export default class AddNewTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const _mutation = `
    mutation createTask{
      createTask(title: "${this.state.task.title}", status: "New"){
        id
        title
        status
      }
    }
    `
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ query: _mutation })
    }
    let task = await fetch(serverConfig.graphQLAPI, options).then((response) => response.json())
    console.log(task)
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={(e) => this.setState({ task: {title: e.target.value} })}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}