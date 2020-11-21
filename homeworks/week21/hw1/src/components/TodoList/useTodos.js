import { useState, useEffect, useRef } from "react";
import useInput from "./useInput";

const writeTodosToLocalStorage = (todos) => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
};

const useTodos = () => {
  const id = useRef(1);
  const { value, setValue, handleInputChange } = useInput();
  const [filter, setFilter] = useState("");

  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    todoData = JSON.parse(todoData);
    if (todoData && todoData[0] !== undefined) {
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const showAllTodo = () => setFilter("");
  const showDoneTodo = () => setFilter("done");
  const showUnfinishTodo = () => setFilter("unfinish");
  const clearAll = () => setTodos([]);

  const handleCheckBoxChange = (id) => {
    return () => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    };
  };

  const handleButtonClick = () => {
    if (value.trim() !== "") {
      setTodos([
        {
          id: id.current,
          content: value,
          isDone: false,
        },
        ...todos,
      ]);
      setValue("");
      id.current++;
    }
  };

  const handleButtonKeyDown = (e) => {
    if (value.trim() !== "" && e.keyCode === 13) {
      handleButtonClick();
    }
  };

  const handleDeleteTodo = (id) => {
    return () => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  };

  return {
    value,
    setValue,
    todos,
    setTodos,
    handleInputChange,
    handleCheckBoxChange,
    handleButtonClick,
    handleButtonKeyDown,
    handleDeleteTodo,
    filter,
    setFilter,
    showAllTodo,
    showDoneTodo,
    showUnfinishTodo,
    clearAll,
  };
};

export default useTodos;
