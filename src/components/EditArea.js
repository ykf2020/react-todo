import styled from 'styled-components'

const EditBackground = styled.div`
  position:fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`

const EditWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position:absolute;
  width: 300px;
  height: 300px;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 2px solid black;
`

const Buttons = styled.div`
  display:flex;
  margin-top:40px;
  justify-content:space-between;
  width:70%;
`

export default function EditArea ({ editedTodo, toggleEditArea, handleEditTodo }) {
  const [editingContent, setEditingContent] = useState(editedTodo.content)
  const handleEditChange = (e) => {
    setEditingContent(e.target.value)
  }
  return (
    <EditBackground>
      <EditWrapper>
        <input value={editingContent} onChange={handleEditChange}></input>
        <Buttons>
          <button onClick={() => {handleEditTodo(editingContent, editedTodo.id)}}>送出</button>
          <button onClick={toggleEditArea}>取消</button>
        </Buttons>
      </EditWrapper>
    </EditBackground>
  )
}
