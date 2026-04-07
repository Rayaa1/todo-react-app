import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State for todos, users, and request status
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for filtering, sorting, and pagination
  const [selectedUser, setSelectedUser] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [visibleCount, setVisibleCount] = useState(10);
  const [completedSort, setCompletedSort] = useState("default");

  // Fetch todos and users once when component mounts
  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ])
      .then(([todosRes, usersRes]) => {
        if (!todosRes.ok || !usersRes.ok) {
          throw new Error("Failed to load data");
        }

        return Promise.all([todosRes.json(), usersRes.json()]);
      })
      .then(([todosData, usersData]) => {
        setTodos(todosData);
        setUsers(
          [...usersData].sort((a, b) => a.username.localeCompare(b.username))
        );
      })
      .catch(() => setError("Error loading data"))
      .finally(() => setLoading(false));
  }, []);

  // Mark a todo as completed and add completion date
  function handleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: true,
              completedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }

  // Mark a todo as not completed and remove completion date
  function handleUncomplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: false,
              completedAt: null,
            }
          : todo
      )
    );
  }

  // Get username by userId
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : `User ${userId}`;
  };

  // Filter todos by selected user
  const filteredTodos =
    selectedUser === "all"
      ? todos
      : todos.filter((todo) => todo.userId === Number(selectedUser));

  let uncompletedTodos = filteredTodos.filter((todo) => !todo.completed);

  // Sort uncompleted todos by title
  if (sortOrder === "asc") {
    uncompletedTodos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    uncompletedTodos.sort((a, b) => b.title.localeCompare(a.title));
  }

  let completedTodos = filteredTodos.filter((todo) => todo.completed);

  // Sort completed todos by completion date
  completedTodos.sort((a, b) => {
    const dateA = new Date(a.completedAt || 0);
    const dateB = new Date(b.completedAt || 0);

    if (completedSort === "asc") {
      return dateA - dateB;
    }

    if (completedSort === "desc") {
      return dateB - dateA;
    }

    return dateB - dateA;
  });

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="app">
      <header>
        <h1>
          Todo React App
          <img
            className="header-img"
            src="https://play-lh.googleusercontent.com/tc-joHbggyCAMNcdozaeg0W1QF3oQcmlj7UtwkS_Avl5w7sw1BEuU_Qflyweg2J7h4ekvNpNy6Uqm79_6_Eu"
            alt="todo app"
          />
        </h1>
      </header>

      <main>
        <section className="controls">
          <div className="control-group">
            <label htmlFor="userFilter">Filter by user</label>
            <select
              id="userFilter"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="all">All users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="boards">
          <div className="todo-panel">
            <div className="panel-header">
              <div className="control-group">
                <label htmlFor="sortUncompleted">Sort:</label>
                <select
                  id="sortUncompleted"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="asc">Title (asc)</option>
                  <option value="desc">Title (desc)</option>
                </select>
              </div>
              <h2>Uncompleted:</h2>
            </div>

            {/* Show message if no uncompleted todos */}
            {uncompletedTodos.length === 0 ? (
              <p className="empty">No todos found.</p>
            ) : (
              <ul className="todo-list">
                {uncompletedTodos.slice(0, visibleCount).map((todo) => (
                  <li key={todo.id} className="todo-item">
                    <div className="todo-text">
                      <p className="todo-title">{todo.title}</p>
                      <p className="todo-meta">User: {getUserName(todo.userId)}</p>
                    </div>

                    {/* Complete todo */}
                    <button onClick={() => handleComplete(todo.id)}>
                      Complete
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Load more todos */}
            {visibleCount < uncompletedTodos.length && (
              <button
                className="load-more"
                onClick={() => setVisibleCount(visibleCount + 10)}
              >
                Load More
              </button>
            )}
          </div>

          <div className="todo-panel">
            <div className="panel-header">
              <div className="control-group">
                <label htmlFor="sortCompleted">Sort:</label>
                <select
                  id="sortCompleted"
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

            {/* Show message if no completed todos */}
            {completedTodos.length === 0 ? (
              <p className="empty">No completed todos.</p>
            ) : (
              <ul className="todo-list">
                {completedTodos.map((todo) => (
                  <li key={todo.id} className="todo-item">
                    <div className="todo-text">
                      <p className="todo-title">{todo.title}</p>
                      <p className="todo-meta">User: {getUserName(todo.userId)}</p>

                      {/* Show completion date */}
                      {todo.completedAt && (
                        <p className="completed-date">
                          Done on:{" "}
                          {new Date(todo.completedAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Uncomplete todo */}
                    <button onClick={() => handleUncomplete(todo.id)}>
                      Uncomplete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>
          Todo app with filtering, sorting, completed dates and load more
          functionality.
        </p>
      </footer>
    </div>
  );
}

export default App;