import { useEffect, useRef } from 'react';
import useInput from './useInput';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, selectFilter } from '../redux/selectors';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearAllTodo,
  filterTodo,
  getTodoFromLocalstorage,
} from '../redux/actions';

const writeTodosToLocalStorage = (todos) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
};

const useTodos = () => {
  const id = useRef(1);
  const { value, setValue, handleInputChange } = useInput();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    let todoData = window.localStorage.getItem('todos') || '';
    todoData = JSON.parse(todoData);
    if (todoData && todoData.length !== 0) {
      id.current = todoData[0].id + 1;
      dispatch(getTodoFromLocalstorage(todoData));
    } else {
      todoData = [];
    }
    return todoData;
  }, []);

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const showAllTodo = () => dispatch(filterTodo(''));
  const showDoneTodo = () => dispatch(filterTodo('done'));
  const showUnfinishedTodo = () => dispatch(filterTodo('unfinished'));
  const clearAll = () => dispatch(clearAllTodo());

  const handleCheckBoxChange = (id) => {
    return () => {
      dispatch(toggleTodo(id));
    };
  };

  const handleButtonClick = () => {
    if (value.trim() !== '') {
      dispatch(addTodo(id.current, value));
      id.current++;
      setValue('');
    }
  };

  const handleButtonKeyDown = (e) => {
    if (value.trim() !== '' && e.keyCode === 13) {
      handleButtonClick();
    }
  };

  const handleDeleteTodo = (id) => {
    return () => {
      dispatch(deleteTodo(id));
    };
  };

  return {
    value,
    setValue,
    todos,
    handleInputChange,
    handleCheckBoxChange,
    handleButtonClick,
    handleButtonKeyDown,
    handleDeleteTodo,
    filter,
    showAllTodo,
    showDoneTodo,
    showUnfinishedTodo,
    clearAll,
  };
};

export default useTodos;
