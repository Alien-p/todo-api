import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
// import TodoStyle from './TodoList.css'

const APIURL = '/api/todos/';

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

  loadTodos() {
    fetch(APIURL)
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Please try later'};
          throw err;
        }
      }
      return resp.json();
    })
    .then(todos => this.setState({todos}))
  }

  addTodo(value) {
    fetch(APIURL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: value})
    })
    .then(response => {
      if(!response.ok) {
        if(response.status >= 400 && response.status < 500) {
          return response.json().then(data => { throw {errorMessage: data.message}})
        } else {
          throw {errorMessage: 'Pleases try later'}
        }
      }
      return response.json()
    })
    .then(newTodo => {
      this.setState({todos: [...this.state.todos, newTodo]});
    })
  }

  deleteTodo(id) {
    const deleteUrl = APIURL+id;
    fetch(deleteUrl, {method: 'DELETE'})
      .then( res => {
        if(!res.ok) {
          if( res.status >= 400 && res.status < 500) {
            return res.json().then(data => { throw {errorMessage: data.message}})
          } else {
            throw {errorMessage: 'Something went wrong...'}
          }
        }
        return res.json()
      })
      .then( () => {
        const todos = this.state.todos.filter( todo => todo._id !== id);
        this.setState({todos: todos})
      })
  }

  render() {
    const todos = this.state.todos.map( t => <TodoItem key={t._id} {...t}/> );
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
