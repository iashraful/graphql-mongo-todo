import React, {Component} from 'react'

export default class ListItem extends Component {
  render() {
    return (
    <li>{ this.props.todoItem.title } - { this.props.todoItem.status }</li>
    )
  }
}