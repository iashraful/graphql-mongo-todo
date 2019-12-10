import React, {Component} from 'react'
import ListItem from './list-item'

export default class AllTask extends Component {

  render() {
    const allTasks = this.props.tasks.map((item) => {
      return <ListItem todoItem={item} key={item.id}/>
    })

    return (
      <div>
        <ul>
          { allTasks.length > 0 ? allTasks : <p>No task found.</p> }
        </ul>
      </div>
    )
  }
}