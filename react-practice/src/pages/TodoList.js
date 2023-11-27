import { useState } from 'react';

function TodoList() {
  const [toDo, setTodo] = useState('');
  const [toDos, setTodos] = useState([]);
  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === '') {
      return;
    }
    setTodos([toDo, ...toDos]);
    setTodo('');
  };
  return (
    <div>
      <h1>MyTodos ({toDos.length})</h1>
      <form>
        <input
          type="text"
          placeholder="Write your to do"
          onChange={onChange}
          value={toDo}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && e.preventDefault()) {
              onSubmit();
            }
          }}
        />
        <button type="submit" onClick={onSubmit}>
          Add To do
        </button>
      </form>
      <div>
        <ul>
          {toDos.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TodoList;
