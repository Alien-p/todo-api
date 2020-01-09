const APIURL = '/api/todos/';

export async function getTodos() {
  return fetch(APIURL)
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
}

export async function addTodo(value) {
  return fetch(APIURL, {
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
}
export async function deleteTodo(id) {
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
    return res.json();
  })
}

export async function toggleTodo(todo) {
  const updateUrl = APIURL + todo._id;

  return fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({completed: !todo.completed})
  })
  .then( resp => {
    if(!resp.ok) {
      if(resp.status >= 400 && resp < 500) {
        return resp.json().then(data => { throw {errorMessage: data.message}})
      } else {
        throw {errorMessage: 'Somethig went wrong...'}
      }
    }
    return resp.json();
  })
}