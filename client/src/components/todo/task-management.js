import React from 'react'

import serverConfig from '../../config/server'
import axios from 'axios'

import AllTask from './all-task'
import AddNewTask from './add-new-task'

export default class TaskManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],

      allTasksQuery: `
      {
        tasks {
          id
          title
          isCompleted
        }
      }
      `
    }

    this.addedNewTask = this.addedNewTask.bind(this)
  }

  async getAllTodo() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query: this.state.allTasksQuery })
    }
    try{
      const tasks = await axios.post(
        serverConfig.graphQLAPI, 
        JSON.stringify({ query: this.state.allTasksQuery }), options)
      if (tasks.status === 200) {
        this.setState({tasks: tasks['data']['data']['tasks']})
      }
    } catch (e) {
      console.log(e)
    }
  }

  addedNewTask(task) {
    this.setState({tasks: [task, ...this.state.tasks]})
  }

  componentDidMount() {
    this.getAllTodo()
  }

  render() {
    return (
      <div className="todo">
        <AddNewTask onNewTaskAdded={this.addedNewTask}/>
        <AllTask tasks={this.state.tasks}/>
      </div>
    )
  }
}