import React from 'react'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import serverConfig from '../../config/server'


export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCompleted: this.props.todoItem.isCompleted
    }
    this.updateTask = this.updateTask.bind(this)
  }

  async updateTask(e) {
    const _mutation = `
    mutation updateTask{
      updateTask(id: "${this.props.todoItem.id}", isCompleted: ${e.target.checked}){
        id
        title
        isCompleted
      }
    }
    `
    const body = JSON.stringify({ query: _mutation })
    const options = {
      headers: { 'Content-Type': 'application/json' },
    }
    let task = await axios.post(serverConfig.graphQLAPI, body, options)
    if (task.status === 200) {
      cogoToast.success('Task updated successfully.', { position: 'top-right' });
      task = task['data']['data']['updateTask']
      this.setState({ isCompleted: task['isCompleted'] })
      this.props.onTaskUpdate(task)
    }
  }

  render() {
    return (
      <input type="checkbox" onChange={this.updateTask} 
        checked={JSON.parse(this.state.isCompleted)}/>
    )
  }
}