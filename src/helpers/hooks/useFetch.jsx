import { useState } from "react";

const useFetch = (todo, url) => {
  const [todos, setTodos] = useState(todo);
  const addItem = async (newItem) => {
    try {
       await fetch(url, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: { 'Content-type': 'application/json; ' },
      });
    } catch (error) {
      console.log(error.massage);
    }
    getFetchTodo()
  };

  const getFetchTodo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pushData = [];
      for (const key in data) {
        pushData.push({ id: key, text: data[key].text });
      }
      setTodos(pushData);
    } catch (error) {
      console.log(error.massage);
    }
  };
  const removeItenHandler = async (todoID) => {
    try {
      await fetch(
        `https://add-todo-1eae2-default-rtdb.firebaseio.com/todos/${todoID}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error.massage);
    }
    getFetchTodo();
  };

  return { todos, getFetchTodo, removeItenHandler, addItem };
};

export default useFetch;
