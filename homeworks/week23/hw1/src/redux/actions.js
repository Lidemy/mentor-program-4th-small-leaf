import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  FILTER_TODO,
  CLEAR_ALL_TODO,
  GET_TODOS_FROM_LOCALSTORAGE,
} from './actionTypes';

function addTodo(id, content) {
  return {
    type: ADD_TODO,
    payload: {
      id,
      content,
    },
  };
}

function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

function clearAllTodo() {
  return {
    type: CLEAR_ALL_TODO,
  };
}

function filterTodo(filter) {
  return {
    type: FILTER_TODO,
    payload: {
      filter,
    },
  };
}

function getTodoFromLocalstorage(todos) {
  return {
    type: GET_TODOS_FROM_LOCALSTORAGE,
    payload: {
      todos,
    },
  };
}

export {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearAllTodo,
  filterTodo,
  getTodoFromLocalstorage,
};
