import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';
// import TodoStyle from './TodoList.css'


class TodoList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this);
  }
 
  componentDidMount() {
    this.loadTodos();
  }

  async loadTodos() {
    let todos = await apiCalls.getTodos();
    this.setState({todos});
  }

  async addTodo(value) {
    let newTodo = await apiCalls.addTodo(value);
    this.setState({todos: [...this.state.todos, newTodo]});
  }

  async deleteTodo(id) {
    await apiCalls.deleteTodo(id);
    const todos = this.state.todos.filter( todo => todo._id !== id);
    this.setState({todos: todos});
  }

  async toggleTodo(todo) {
    let updTodo = await apiCalls.toggleTodo(todo);
    const todos = this.state.todos.map(t => (t._id === updTodo._id) ? {...t, completed: !t.completed} : t);
    this.setState({todos: todos});
  }

  render() {
    const todos = this.state.todos.map( todo => 
      <TodoItem 
        key = {todo._id} 
        onDelete = {this.deleteTodo.bind(this, todo._id)} 
        onToggle = {this.toggleTodo.bind(this, todo)}
        {...todo}
      />
    );
    
    return(
      <div>
        <TodoForm addTodo={this.addTodo}/>
        <h1>Todo List!</h1>
        <ul>{todos}</ul>
      </div>
    )
  }
}

export default TodoList;
