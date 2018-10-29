import React from 'react'

export default props =>
  <form onSubmit={props.handleTodoSubmit}>
    <input
      type='text'
      className="new-todo"
      autoFocus
      onChange={props.handleNewTodoChange}
      value={props.currentTodo}
      placeholder="What needs to be done?"/>
  </form>
