import React from 'react'
import serverConfig from '../../config/server'
import axios from 'axios'


export default class AddNewTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {
        title: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const _mutation = `
    mutation createTask{
      createTask(title: "${this.state.task.title}"){
        id
        title
        isCompleted
      }
    }
    `
    const options = {
      headers: { 'Content-Type': 'application/json' },
    }
    const task = await axios.post(serverConfig.graphQLAPI, JSON.stringify({ query: _mutation }), options)
    if (task['status'] === 200) {
      const data = task['data']['data']['createTask']
      this.props.onNewTaskAdded(data)
      this.setState({ task: {title: ''} })
    }
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.task.title}
            onChange={(e) => this.setState({ task: {title: e.target.value} })}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}