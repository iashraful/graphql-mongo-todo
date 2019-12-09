import React from 'react'
import AllTask from './components/todo/all-task'
import AddNewTask from './components/todo/add-new-task'

class App extends React.Component {
  render() {
    return (
      <div>
        <AddNewTask/>
        <AllTask/>
      </div>
    )
  }
}

export default App;
