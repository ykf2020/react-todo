import { useState, useEffect, useRef, useCallback } from 'react'
import Inputs from './components/Inputs'
import TodoItem from './components/TodoItem'
import EditArea from './components/TodoItem'

function App() {
  const id = useRef(1)
  const [todos, setTodos] = useState([])
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [editedTodo, setEditedTodo] = useState()
  const [isEditing, setIsEditing] = useState(false)

  const handleAddTodo = () => {
    setTodos([{
      id:id.current,
      content: value,
      isDone: false
    }, ...todos])
    setValue('')
    id.current ++
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if ( todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const handleSetStatus = (e) => {
    setStatus(e.target.value)
  }

  const filterTodos = useCallback(() => {
    switch(status) {
      case "completed": {
        setFilteredTodos(todos.filter(todo => todo.isDone))
        break
      }
      case "uncompleted": {
        setFilteredTodos(todos.filter(todo => !todo.isDone))
        break
      }
      default: {
        setFilteredTodos(todos)
      }
    }
  },[todos, status])

  const handleEditTodo = (newContent, id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: newContent
      }
    }))
    toggleEditArea()
  }

  const handleSetEditTodo = (todo) => {
    setEditedTodo(todo)
  }

  const  handleClearAll = () => {
    setTodos([])
  }

  const toggleEditArea = () => {
    setIsEditing(!isEditing)
  }

  useEffect(() => {
    filterTodos()
  },[todos, status, filterTodos])

  return (
    <div className="App">
      <Inputs
        value={value}
        handleInputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
        handleSetStatus={handleSetStatus}
        handleClearAll={handleClearAll}
      />
    {
      filteredTodos.map(todo =>
        <TodoItem
          key={todo.id}
          todo={todo}
          handleEditTodo={handleEditTodo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleSetEditTodo={handleSetEditTodo}
          toggleEditArea={toggleEditArea}
        />)
    }
    { isEditing &&
      <EditArea
        handleEditTodo={handleEditTodo}
        toggleEditArea={toggleEditArea}
        editedTodo={editedTodo}
      /> }
    </div>
  );
}

export default App;
