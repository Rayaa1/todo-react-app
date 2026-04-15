import TodoItem from "./TodoItem";

export default function CompletedSection({
  todos,
  completedSort,
  setCompletedSort,
  visibleCount,
  loadMore,
  getUserName,
  onUncomplete,
}) {
  return (
    <div className="todo-panel">
      <div className="panel-header">
        <div className="control-group">
          <label>Sort:</label>
          <select
            value={completedSort}
            onChange={(e) => setCompletedSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="asc">Date (asc)</option>
            <option value="desc">Date (desc)</option>
          </select>
        </div>
        <h2>Completed:</h2>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No completed todos.</p>
      ) : (
        <ul className="todo-list">
          {todos.slice(0, visibleCount).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              username={getUserName(todo.userId)}
              onUncomplete={onUncomplete}
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
