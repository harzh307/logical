import "./App.css";
import Todo from "./components/Todo";
import Users from "./components/Users";

const App = () => {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Todo />
      {/* <Users /> */}
    </div>
  );
};

export default App;
