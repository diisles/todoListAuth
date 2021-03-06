import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import todosReducer from './todosReducer';

module.exports = combineReducers({
  form: formReducer,
  auth: authReducer,
  alerts: alertsReducer,
  todos: todosReducer
});


// (state, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       var newTodos = [
//         ...state.todos,
//         {
//           text: action.text,
//           id: uuid.v4()
//         }
//       ];
//       return {
//         todos: newTodos
//       };
//
//     case 'DELETE_TODO':
//       var newTodos = state.todos.filter((todo) => {
//           if (todo.id === action.id) {
//             return false;
//           }
//           return true;
//         });
//         return {
//           todos: newTodos
//         };
//
//     default:
//       return state;
//
//   }
// };
