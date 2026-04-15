export default function TodoItem({ todo, username, onComplete, onUncomplete }) {
  return (
    <li className="todo-item">
      <div className="todo-text">
        <p className="todo-title">{todo.title}</p>

        {todo.completedAt && (
          <p className="completed-date">
            Done on: {new Date(todo.completedAt).toLocaleString()}
          </p>
        )}
      </div>

      {!todo.completed ? (
        <button onClick={() => onComplete(todo.id)}>Complete</button>
      ) : (
        <button onClick={() => onUncomplete(todo.id)}>Uncomplete</button>
      )}
    </li>
  );
}
