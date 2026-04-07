import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        setError("Something went wrong while loading todos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Todo React App</h1>

      <div>
        <h2>Uncompleted Todos</h2>
        {uncompletedTodos.slice(0, 10).map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>

      <div>
        <h2>Completed Todos</h2>
        {completedTodos.slice(0, 10).map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;