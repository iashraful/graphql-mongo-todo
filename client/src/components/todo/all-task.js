import React, {Component} from 'react'
import ListItem from './list-item'
import Checkbox from './checkbox'

export default class AllTask extends Component {

  render() {
    const allTasks = this.props.tasks.map((item) => {
      return (
        <div className="task-item-wrapper" key={item.id}>
          <Checkbox todoItem={item}/>
          <ListItem todoItem={item}/>
        </div>
      )
    })

    return (
      <div className="task-list">
        { allTasks.length > 0 ? allTasks : <p>No task found.</p> }
      </div>
    )
  }
}