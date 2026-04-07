import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [visibleCount, setVisibleCount] = useState(10);
  const [completedSort, setCompletedSort] = useState("default");

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
          [...usersData].sort((a, b) =>
            a.username.localeCompare(b.username)
          )
        );
      })
      .catch(() => setError("Error loading data"))
      .finally(() => setLoading(false));
  }, []);

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

  const filteredTodos =
    selectedUser === "all"
      ? todos
      : todos.filter((todo) => todo.userId === Number(selectedUser));

  // UNCOMPLETED
  let uncompletedTodos = filteredTodos.filter((todo) => !todo.completed);

  if (sortOrder === "asc") {
    uncompletedTodos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    uncompletedTodos.sort((a, b) => b.title.localeCompare(a.title));
  }

  // COMPLETED
  let completedTodos = filteredTodos.filter((todo) => todo.completed);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <label>Filter by user: </label>
        <select
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

      <hr />

      {/* UNCOMPLETED */}
      <div>
        <h2>Uncompleted Todos</h2>

        <label>Sort: </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        {uncompletedTodos.slice(0, visibleCount).map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <button onClick={() => handleComplete(todo.id)}>Complete</button>
          </div>
        ))}

        {visibleCount < uncompletedTodos.length && (
          <button onClick={() => setVisibleCount(visibleCount + 10)}>
            Load More
          </button>
        )}
      </div>

      <hr />

      {/* COMPLETED */}
      <div>
        <h2>Completed Todos</h2>

        <label>Sort by date: </label>
        <select
          value={completedSort}
          onChange={(e) => setCompletedSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">Oldest first</option>
          <option value="desc">Newest first</option>
        </select>

        {completedTodos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>

            {todo.completedAt && (
              <small>
                Completed on: {new Date(todo.completedAt).toLocaleString()}
              </small>
            )}

            <button onClick={() => handleUncomplete(todo.id)}>
              Uncomplete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;