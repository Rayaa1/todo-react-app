import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ])
      .then(([todosRes, usersRes]) => {
        return Promise.all([todosRes.json(), usersRes.json()]);
      })
      .then(([todosData, usersData]) => {
        setTodos(todosData);
        setUsers(usersData);
      })
      .catch(() => {
        setError("Error loading data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: true, completedAt: new Date().toISOString() }
          : todo
      )
    );
  }

  function handleUncomplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: false, completedAt: null }
          : todo
      )
    );
  }

  // FILTER
  const filteredTodos =
    selectedUser === "all"
      ? todos
      : todos.filter((todo) => todo.userId === Number(selectedUser));

  // UNCOMPLETED + SORT
  let uncompletedTodos = filteredTodos.filter((t) => !t.completed);

  if (sortOrder === "asc") {
    uncompletedTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortOrder === "desc") {
    uncompletedTodos.sort((a, b) => b.title.localeCompare(a.title));
  }

  // COMPLETED
  const completedTodos = filteredTodos.filter((t) => t.completed);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Todo App</h1>

      {/* FILTER BY USERNAME */}
      <div>
        <label>Filter by user:</label>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="all">All users</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sort uncompleted:</label>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div>
        <h2>Uncompleted Todos</h2>

        {uncompletedTodos.slice(0, visibleCount).map((todo) => (
          <div key={todo.id}>
            {todo.title}
            <button onClick={() => handleComplete(todo.id)}>
              Complete
            </button>
          </div>
        ))}

        {/* LOAD MORE BUTTON */}
        {visibleCount < uncompletedTodos.length && (
          <button onClick={() => setVisibleCount(visibleCount + 10)}>
            Load More
          </button>
        )}
      </div>

      <div>
        <h2>Completed Todos</h2>

        {completedTodos.slice(0, 10).map((todo) => (
          <div key={todo.id}>
            {todo.title}
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