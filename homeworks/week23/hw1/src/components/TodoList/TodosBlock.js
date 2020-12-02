import styled from 'styled-components';
import useTodos from '../../hooks/useTodos';

const TodoInput = styled.section`
  padding: 20px;
  min-height: 300px;

  .input-todo {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  input {
    width: 460px;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    font-size: 20px;
  }
`;

const Button = styled.button`
  padding: 0;
  display: inline;
  height: 35px;
  width: 50px;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`;
const Todos = styled.div``;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  padding: 5px 10px;

  label {
    display: flex;
    align-items: center;
    font-size: 20px;
    width: 480px;
  }

  input {
    width: 20px;
    height: 20px;
    margin-right: 10px;

    &:checked ~ p {
      text-decoration: line-through;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  p {
    margin: 0;
    width: 440px;
    display: block;
    font-size: 20px;
    word-break: break-all;
    vertical-align: bottom;
  }

  &:hover {
    box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 30px;
  font-size: 15px;

  button {
    cursor: pointer;
    border-radius: 6px;
    padding: 4px;
    border: 2px solid transparent;
    background: none;
  }

  button:hover {
    box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }

  button:focus {
    outline: 0;
    box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }
`;

const TodoFilter = ({
  showAllTodo,
  showDoneTodo,
  showUnfinishedTodo,
  clearAll,
}) => {
  return (
    <Filter>
      <button className="all" onClick={showAllTodo}>
        全部
      </button>
      <button className="unfinished" onClick={showUnfinishedTodo}>
        未完成
      </button>
      <button className="done" onClick={showDoneTodo}>
        已完成
      </button>
      <button className="clear-all" onClick={clearAll}>
        清空
      </button>
    </Filter>
  );
};

const Todo = ({ todo, handleDeleteTodo, handleCheckBoxChange }) => {
  return (
    <TodoItem data-todo-id={todo.id}>
      <label>
        <input
          type="checkbox"
          onChange={handleCheckBoxChange(todo.id)}
          checked={todo.isDone}
        />
        <p>{todo.content}</p>
      </label>
      <Button onClick={handleDeleteTodo(todo.id)}>刪除</Button>
    </TodoItem>
  );
};

const TodosBlock = () => {
  const {
    value,
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
  } = useTodos();

  return (
    <>
      <TodoInput>
        <div className="input-todo">
          <input
            type="text"
            placeholder="Add something todo..."
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleButtonKeyDown}
          />
          <Button onClick={handleButtonClick}>新增</Button>
        </div>
        <Todos>
          {todos
            .filter((todo) => {
              if (filter === '') return todo;
              return filter === 'done' ? todo.isDone : !todo.isDone;
            })
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                handleCheckBoxChange={handleCheckBoxChange}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
        </Todos>
      </TodoInput>
      <TodoFilter
        showAllTodo={showAllTodo}
        showDoneTodo={showDoneTodo}
        showUnfinishedTodo={showUnfinishedTodo}
        clearAll={clearAll}
      />
    </>
  );
};

export default TodosBlock;
