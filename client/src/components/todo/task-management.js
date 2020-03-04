import React from 'react'

import serverConfig from '../../config/server'
import axios from 'axios'

import cogoToast from 'cogo-toast'

import AllTask from './all-task'
import AddNewTask from './add-new-task'

export default class TaskManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      lastUpdatedTask: {},

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
    this.updateTaskFromDB = this.updateTaskFromDB.bind(this)
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

  async updateTaskFromDB (taskItem, checked) {
    const _mutation = `
    mutation updateTask{
      updateTask(id: "${taskItem.id}", isCompleted: ${checked}){
        id
        title
        isCompleted
      }
    }
    `
    this.setState({ lastUpdatedTask: {} })
    const body = JSON.stringify({ query: _mutation })
    const options = {
      headers: { 'Content-Type': 'application/json' },
    }
    let task = await axios.post(serverConfig.graphQLAPI, body, options)
    if (task.status === 200) {
      cogoToast.success('Task updated successfully.', { position: 'top-right' });
      task = task['data']['data']['updateTask']
      this.setState({ lastUpdatedTask: task })
      this.findAndUpdateTask(task)
    }
  }

  findAndUpdateTask(updatedTask) {
    const currentTasks = this.state.tasks;
    let temp = []
    currentTasks.map((item) => {
      if (!(item.id === updatedTask.id)) {
        temp.push(item)
      }
    })
    if (JSON.parse(updatedTask.isCompleted)) {
      temp.push(updatedTask)
    } else {
      temp.unshift(updatedTask)
    }
    this.setState({ tasks: temp })
  }

  componentDidMount() {
    this.getAllTodo()
  }

  render() {
    return (
      <div className="todo">
        <AddNewTask onNewTaskAdded={this.addedNewTask}/>
        <AllTask
          tasks={this.state.tasks}
          onTaskUpdate={this.updateTaskFromDB}
          taskGotUpdated={this.state.lastUpdatedTask}/>
      </div>
    )
  }
}
