import React, { useState } from "react";

const CustomTodo = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [status, setStatus] = useState("All");
  const [id, setId] = useState(1);

  const onAddTodo = () => {
    if (todoText.trim()) {
      setId(id + 1);
      setTodoList((array) => [
        ...array,
        { id: id, text: todoText, completed: false },
      ]);

      setTodoText("");
    }
  };

  const onCompleteTodo = (x, i) => {
    setTodoList([
      ...todoList.slice(0, i),
      { ...x, completed: !x.completed },
      ...todoList.slice(i + 1),
    ]);

  };

  const onDeleteTodo = (i) => {
    setTodoList(todoList.filter((x) => x.id !== i.id));
  };

  const changeStatus = (e) => {
    setStatus(e.target.name);
  };
  const filterArray = todoList.filter((x) => {
    switch (status) {
      case "All":
        return x;
      case "Completed":
        return x.completed;
      case "Incomplete":
        return !x.completed;
      default:
        return x;
    }
  });

  return (
    <div>
      <h1>Todo App</h1>
      <span style={{ display: "flex", flex: 1, gap: 4 }}>
        <input
          type={"text"}
          value={todoText}
          onChange={(e) => {
            e.preventDefault();
            setTodoText(e.target.value);
          }}
        />
        <button onClick={() => onAddTodo()}>submit</button>
      </span>
      <div
        style={{
          marginTop: 10,
        }}
      >
        {filterArray?.map((item, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <span>{item.text}</span>{" "}
            <span>
              <button
                style={{ margin: "0px 10px" }}
                onClick={() => onCompleteTodo(item, i)}
              >
                {item.completed ? "undo" : "done"}
              </button>
              <button onClick={() => onDeleteTodo(item)}>delete</button>
            </span>
          </div>
        ))}
        <button name="All" onClick={changeStatus}>
          All Todo
        </button>
        <button
          name="Completed"
          style={{
            margin: "0px 10px",
          }}
          onClick={changeStatus}
        >
          Completed Todo
        </button>
        <button name="Incomplete" onClick={changeStatus}>
          Incomplete Todo
        </button>
      </div>
    </div>
  );
};

export default CustomTodo;
