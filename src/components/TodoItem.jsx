export default function TodoItem({ todo, username, onComplete, onUncomplete }) {
  return (
    <li className="todo-item">
      <div className="todo-text">
        <p className="todo-title">{todo.title}</p>
        <div className="todo-user-row">
  <span className="todo-user">👤 {username}</span>

  {todo.completedAt && (
    <span className="completed-date">
      {new Date(todo.completedAt).toLocaleString()}
    </span>
  )}
</div>
      </div>

      {!todo.completed ? (
        <button onClick={() => onComplete(todo.id)}>Complete</button>
      ) : (
        <button onClick={() => onUncomplete(todo.id)}>Uncomplete</button>
      )}
    </li>
  );
}
