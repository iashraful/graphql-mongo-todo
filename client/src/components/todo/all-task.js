import React, {Component} from 'react'
import ListItem from './list-item'
import serverConfig from '../../config/server'

export default class AllTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      allTasksQuery: `
      {
        tasks {
          id
          title
          status
        }
      }      
      `
    }
  }

  async getAllTodo() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query: this.state.allTasksQuery })
    }
    const tasks = await fetch(serverConfig.graphQLAPI, options).then((response) => response.json())
    this.setState({tasks: tasks['data']['tasks']})
  }

  componentDidMount() {
    this.getAllTodo()
  }

  render() {
    const allTasks = this.state.tasks.map((item) => {
      return <ListItem todoItem={item} key={item.id}/>
    })

    return (
      <div>
        <ul>
          { allTasks }
        </ul>
      </div>
    )
  }
}