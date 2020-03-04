import React, {Component} from 'react'
import ListItem from './list-item'
import Checkbox from './checkbox'

export default class AllTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks
    }

    this.passToParent = this.passToParent.bind(this)
  }

  passToParent(task, checked) {
    this.props.onTaskUpdate(task, checked)
  }

  render() {
    const allTasks = this.props.tasks.map((item) => {
      return (
        <div className="task-item-wrapper" key={item.id}>
          <Checkbox
            todoItem={item}
            onTaskUpdate={this.passToParent}
            afterTaskUpdated={this.props.taskGotUpdated}/>
          <ListItem todoItem={item} id={item.id}/>
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