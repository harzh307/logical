import "./App.css";
import ChatContainer from "./components/ChatContainer";
// import CustomTodo from "./components/CustomTodo";
import Todo from "./components/Todo";
import Users from "./components/Users";

const App = () => {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      {/* <Todo /> */}
      <ChatContainer />
      {/* <CustomTodo /> */}
      {/* <Users /> */}
    </div>
  );
};

export default App;
