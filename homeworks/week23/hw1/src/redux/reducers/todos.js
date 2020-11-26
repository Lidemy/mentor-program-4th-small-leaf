import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_ALL_TODO,
  FILTER_TODO,
  GET_TODOS_FROM_LOCALSTORAGE,
} from '../actionTypes';

const initialState = {
  todos: [],
  filter: '',
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          {
            id: action.payload.id,
            content: action.payload.content,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    case CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };
    case FILTER_TODO:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case GET_TODOS_FROM_LOCALSTORAGE:
      return {
        ...state,
        todos: action.payload.todos,
      };
    default:
      return state;
  }
}

export default todosReducer;
