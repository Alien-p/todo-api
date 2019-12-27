import React from 'react';

function TodoItem({name, completed}) {
  return(
    <li style={{textDecoration: completed ? 'line-through' : 'none'}}>{name}</li>
  )
}

export default TodoItem;