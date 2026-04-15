import TodoItem from "./TodoItem";

export default function UncompletedSection({
  todos,
  sortOrder,
  setSortOrder,
  visibleCount,
  loadMore,
  getUserName,
  onComplete,
}) {
  return (
    <div className="todo-panel">
      <div className="panel-header">
        <div className="control-group">
          <label>Sort:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Default</option>
            <option value="asc">Title (asc)</option>
            <option value="desc">Title (desc)</option>
          </select>
        </div>
        <h2>Uncompleted:</h2>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No todos found.</p>
      ) : (
        <ul className="todo-list">
          {todos.slice(0, visibleCount).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              username={getUserName(todo.userId)}
              onComplete={onComplete}
            />
          ))}
        </ul>
      )}

      {visibleCount < todos.length && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
