import React, {Component} from 'react'

export default class ListItem extends Component {
  render() {
    return (
      <div className="list-item">
        { 
          JSON.parse(this.props.todoItem.isCompleted) ? 
          <strike>{this.props.todoItem.title}</strike> :
          this.props.todoItem.title
        }
      </div>
    )
  }
}