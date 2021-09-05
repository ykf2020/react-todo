export default function Inputs ({ value, handleInputChange, handleAddTodo, handleSetStatus, handleClearAll }) {
  return (
    <>
      <input type="text" value={value} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
      <select onChange={handleSetStatus}>
        <option defaultValue value="all">全部</option>
        <option value="completed">已完成</option>
        <option value="uncompleted">未完成</option>
      </select>
      <button onClick={handleClearAll}>全部清除</button>
    </>
  )
}
