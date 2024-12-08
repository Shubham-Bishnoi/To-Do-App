import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/todos", {
      headers: { token: localStorage.getItem("token") },
    });
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      <input
        type="text"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onComplete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
