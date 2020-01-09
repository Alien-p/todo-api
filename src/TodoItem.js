import React from 'react';

function TodoItem({onDelete, onToggle, name, completed}) {
  return(
    <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
      <span  onClick={onToggle}>
        {name} 
      </span>
      <i className="fas fa-trash-alt" onClick={onDelete}></i>
    </li>
  )
}

export default TodoItem;