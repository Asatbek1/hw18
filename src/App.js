import React, { useEffect, useState } from "react";
import useFetch from "./helpers/hooks/useFetch";
import "./App.css";
const App = () => {
  const [todo, setTodo] = useState("");
  const URL = "https://add-todo-1eae2-default-rtdb.firebaseio.com/todos.json";
  const { todos, getFetchTodo, removeItenHandler, addItem } = useFetch([], URL);
  const addTodoHandler = (e) => {
    e.preventDefault();
    addItem({ text: todo });
    setTodo("");
  };

  useEffect(() => {
    getFetchTodo();
  }, []);
  return (
    <div className="App">
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => removeItenHandler(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
