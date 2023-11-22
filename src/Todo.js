import React, { useState, useContext } from "react";
import { ThemeContext } from "./context";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  id,
  completed: initialValue,
  dateCompleted,
  toggleTodo,
}) {
  const [completed, setCompleted] = useState(initialValue);
  const [completedTime, setCompletedTime] = useState(dateCompleted || null);

  function handleToggleTodo() {
    const isChecked = !completed;
    setCompleted(isChecked);

    if (isChecked) {
      setCompletedTime(new Date().toLocaleString());
    } else {
      setCompletedTime(null);
    }
    
    toggleTodo(id);
  }

  const { secondaryColor } = useContext(ThemeContext);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{description}</div>
      <div>
        <strong>Author:</strong> {author}
      </div>
      <div>
        <strong>Created on:</strong> {new Date(dateCreated).toLocaleString()}
      </div>
      <div>
      <strong>Completed:</strong>
        <input type="checkbox" checked={completed} readOnly />
        <button onClick={handleToggleTodo}>{completed ? "INCOMPLETE" : "COMPLETE"}</button>
      </div>
      {completedTime && (
        <div>
          <strong>Completed on:</strong> {completedTime}
        </div>
      )}
    </div>
  );
}
