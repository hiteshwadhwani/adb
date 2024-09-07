import React from "react";
import { useTodoController } from "./todo.controller";

const TodoView = () => {
  const { todos, isLoading, isError, onInputChange, input, onSubmit, isSubmitDisabled, isInputDisabled } = useTodoController();

  const getLoadingUI = () => {
    return <img src="/loading.webp" alt="error" />;
  };

  const getErrorUI = () => {
    return <img src="/error.webp" alt="error" />;
  };

  const getTodoUI = () =>
    todos.map((todo, index) => <div key={index}>{todo}</div>);

  const getCreateTodoUI = () => {
    return (
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>ToDo: </label>
            <input disabled={isInputDisabled} value={input} onChange={onInputChange} type="text" />
          </div>
          <div style={{ marginTop: "5px" }}>
            <button disabled={isSubmitDisabled}>Add ToDo!</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>List of TODOs</h1>
      {isLoading && getLoadingUI()}
      {isError && getErrorUI()}
      {todos?.length > 0 && getTodoUI()}
      {getCreateTodoUI()}
    </div>
  );
};
export default TodoView;
