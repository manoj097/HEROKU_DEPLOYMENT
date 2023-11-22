import React, { useContext } from "react";
import { StateContext } from "./context";
import Todo from "./Todo";
import { useResource } from "react-request-hook";

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const { todo } = state;

  const [toggleTodoResponse, toggleTodo] = useResource(
    ({ id, completed, dateCompleted }) => ({
      url: `/todos/${id}`,
      method: "patch",
      data: { completed, dateCompleted },
    })
  );

  const [deleteTodoResponse, deleteTodo] = useResource((id) => ({
    url: `/todos/${id}`,
    method: "delete",
  }));

  const handleToggleTodo = (id) => {
    const todoToToggle = todo.find((item) => item.id === id);

    if (!todoToToggle) {
      console.error("Todo not found for ID:", id);
      return;
    }

    toggleTodo({
      id: todoToToggle.id,
      completed: !todoToToggle.completed,
      dateCompleted: !todoToToggle.completed
        ? new Date().toLocaleString()
        : null,
    });
  };

  const handleDeleteTodo = (id) => {
    const todoToDelete = todo.find((item) => item.id === id);

    if (!todoToDelete) {
      console.error("Todo not found for ID:", id);
      return;
    }

    deleteTodo(todoToDelete.id); // Use the correct ID from the server data

    dispatch({ type: "DELETE_TODO", todo: todoToDelete });
  };

  return (
    <div>
      {todo.length === 0 && <h2>No todos found.</h2>}
      {todo.length > 0 &&
        todo.map((todos) => (
          <div key={todos.id}>
            <Todo {...todos} toggleTodo={() => handleToggleTodo(todos.id)} />
            <button onClick={() => handleDeleteTodo(todos.id)}>DELETE</button>
          </div>
        ))}
    </div>
  );
}
