import React, {Component} from 'react'

export default class ListItem extends Component {
  render() {
    return (
      <div className="list-item">{ this.props.todoItem.title }</div>
    )
  }
}