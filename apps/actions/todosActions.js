import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { TODOS_URL, TODO_URL } from '../api';
import { addAlert } from './alertsActions';

exports.createTodo = (text) => {
  return function (dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      const { username, password } = credentials;
      return axios.post(TODOS_URL(username), { text }, {
        headers: { authorization: password }
      }).then((response) => {
        dispatch(addTodo(response.data.todo));
      }).catch((err) => {
        dispatch(addAlert('Could not create todo.'));
      });
    });
  };
};
exports.deleteTodo = (todo_id) => {
  return function (dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      const { username, password } = credentials;
      return axios.delete(TODO_URL(username, todo_id), {
        headers: { authorization: password }
      }).then((response) => {
        dispatch(removeTodo(todo_id));
      }).catch((err) => {
        dispatch(addAlert('Could not delete todo.'));
      });
    });
  };
};
exports.getTodos = function (dispatch) {
  return Keychain.getGenericPassword().then((credentials) => {
      const { username, password } = credentials;
      return axios.get(TODOS_URL(username), {
        headers: { authorization: password }
      }).then((response) => {
        dispatch(setTodos(response.data.todos));
      }).catch((err) => {
        dispatch(addAlert('Could not get todos.'));
      });
    });
  };

const addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  };
};

const removeTodo = (todo_id) => {
  return {
    type: 'REMOVE_TODO',
    todo_id
  };
};

const setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    todos
  };
};
