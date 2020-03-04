import React from 'react'

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.updateTask = this.updateTask.bind(this)
  }

  async updateTask(e) {
    this.props.onTaskUpdate(this.props.todoItem, e.target.checked)
  }

  render() {
    return (
      <input type="checkbox" onChange={this.updateTask} 
        checked={JSON.parse(this.props.todoItem.isCompleted)}/>
    )
  }
}