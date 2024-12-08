import React from "react";

const TodoItem = ({ todo, onDelete, onComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span>{todo.title}</span>
      <div>
        <button onClick={() => onComplete(todo._id)}>Complete</button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
