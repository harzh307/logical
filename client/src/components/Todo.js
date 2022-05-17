import React, { useEffect, useState } from "react";
import axios from "../axios/axios";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    axios
      .get("/todo")
      .then((response) => {
        setTodoList(response?.data);
      })
      .catch((err) => console.error(err, "error"));
    return () => {};
  }, []);

  const onAddTodo = (e) => {
    setId((id) => id++);
    e.preventDefault();
    if (todoText.trim()) {
      axios
        .post("/todo", {
          id: id,
          text: todoText,
          completed: false,
        })
        .then((response) => setTodoList((array) => [...array, response?.data]))
        .catch((err) => console.log(err));
      // setTodoList([...todoList, { text: todoText, completed: false }]);
      setTodoText("");
    }
  };

  const onDone = (index, todo) => {
    axios
      .put(`${"/todo/" + todo.id}`, { ...todo, completed: !todo?.completed })
      .then((res) => {
        setTodoList([
          ...todoList?.slice(0, index),
          { ...todo, completed: !todo?.completed },
          ...todoList?.slice(index + 1),
        ]);
      })
      .catch((err) => console.log(err));
  };

  const onDeleteTodo = (index, todo) => {
    axios
      .delete(`${"/todo/" + todo.id}`)
      .then((res) => setTodoList(todoList?.filter((todo, i) => i !== index)))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Todo App</h1>
      <span style={{ display: "flex", flex: 1, gap: 4 }}>
        <input
          type={"text"}
          value={todoText}
          onChange={(e) => {
            e.preventDefault();
            setTodoText(e?.nativeEvent?.target?.value);
          }}
        />
        <button onClick={onAddTodo}>submit</button>
      </span>
      <div>
        {todoList?.map((todo, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: 10, margin: "10px 0px" }}
          >
            <span>{todo.id}</span>
            <span style={{ display: "flex", flex: 0.2 }}>{todo.text}</span>
            <div style={{ display: "flex" }}>
              <button onClick={() => onDeleteTodo(index, todo)}>delete</button>
              <button onClick={() => onDone(index, todo)}>
                {todo.completed ? "undo" : "done"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
