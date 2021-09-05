import styled from 'styled-components'

// styled components

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`
const TodoContent = styled.div`
  color: rgba(2, 40, 77)
  font-size: 16px;

  ${props => props.$isDone && `
    text-decoration: line-through;
  `}
`
const TodoButtonWrapper = styled.div`
`
const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`

export default function TodoItem ({ todo, handleSetEditTodo, handleDeleteTodo, handleToggleTodo, handleEditTodo, toggleEditArea }) {
  return (
    <TodoItemWrapper>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button onClick={() => {handleSetEditTodo(todo);toggleEditArea()}}>編輯</Button>
        <Button onClick={() => {handleToggleTodo(todo.id)}}>{todo.isDone ? '未完成':'已完成'}</Button>
        <Button onClick={() => {handleDeleteTodo(todo.id)}}>刪除</Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  )
}
