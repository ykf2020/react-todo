import { useState, useEffect, useRef, useCallback } from "react";
import Inputs from "./components/Inputs";
import styled from "styled-components";

const EditBackground = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const EditWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  width: 70%;
`;



const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;
const TodoContent = styled.div`
  color: rgba(2, 40, 77)
  font-size: 16px;

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;
const TodoButtonWrapper = styled.div``;
const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;


function EditArea({
  editedTodo,
  toggleEditArea,
  handleEditTodo,
}) {
  const [editingContent, setEditingContent] = useState(editedTodo.content);
  const handleEditChange = (e) => {
    setEditingContent(e.target.value);
  };
  return (
    <EditBackground>
      <EditWrapper>
        <input value={editingContent} onChange={handleEditChange}></input>
        <Buttons>
          <button
            onClick={() => {
              handleEditTodo(editingContent, editedTodo.id);
            }}
          >
            送出
          </button>
          <button onClick={toggleEditArea}>取消</button>
        </Buttons>
      </EditWrapper>
    </EditBackground>
  );
}

function TodoItem({
  todo,
  handleSetEditTodo,
  handleDeleteTodo,
  handleToggleTodo,
  handleEditTodo,
  toggleEditArea,
}) {
  return (
    <TodoItemWrapper>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            // handleSetEditTodo(todo);
            toggleEditArea();
          }}
        >
          編輯
        </Button>
        <Button
          onClick={() => {
            handleToggleTodo(todo.id);
          }}
        >
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <Button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

function App() {
  const id = useRef(1);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTodo = () => {
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleSetStatus = (e) => {
    setStatus(e.target.value);
  };

  const filterTodos = useCallback(() => {
    switch (status) {
      case "completed": {
        setFilteredTodos(todos.filter((todo) => todo.isDone));
        break;
      }
      case "uncompleted": {
        setFilteredTodos(todos.filter((todo) => !todo.isDone));
        break;
      }
      default: {
        setFilteredTodos(todos);
      }
    }
  }, [todos, status]);

  const handleEditTodo = (newContent, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: newContent,
        };
      })
    );
    toggleEditArea();
  };

  const handleSetEditTodo = (todo) => {
    setEditedTodo(todo);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  const toggleEditArea = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    filterTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <Inputs
        value={value}
        handleInputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
        handleSetStatus={handleSetStatus}
        handleClearAll={handleClearAll}
      />
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleEditTodo={handleEditTodo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleSetEditTodo={handleSetEditTodo}
          toggleEditArea={toggleEditArea}
        />
      ))}
      {isEditing && (
        <EditArea
          handleEditTodo={handleEditTodo}
          toggleEditArea={toggleEditArea}
          editedTodo={editedTodo}
        />
      )}
    </div>
  );
}

export default App;
