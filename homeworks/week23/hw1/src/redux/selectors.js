const selectTodos = (store) => store.state.todos;
const selectFilter = (store) => store.state.filter;

export { selectTodos, selectFilter };
