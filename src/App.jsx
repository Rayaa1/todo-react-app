import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UserFilter from "./components/UserFilter";
import UncompletedSection from "./components/UncompletedSection";
import CompletedSection from "./components/CompletedSection";

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [completedSort, setCompletedSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(10);

  // Fetch todos + users
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

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(5);
  }, [selectedUser]);

  // Complete todo
  function handleComplete(id) {
    setTodos((prev) =>
      prev.map((todo) =>
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

  // Uncomplete todo
  function handleUncomplete(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: false, completedAt: null }
          : todo
      )
    );
  }

  // Get username
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : `User ${userId}`;
  };

  // Filter by user
  const filteredTodos =
    selectedUser === "all"
      ? todos
      : todos.filter((todo) => todo.userId === Number(selectedUser));

  // Uncompleted todos
  let uncompletedTodos = filteredTodos.filter((t) => !t.completed);

  if (sortOrder === "asc") {
    uncompletedTodos = [...uncompletedTodos].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortOrder === "desc") {
    uncompletedTodos = [...uncompletedTodos].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  // Completed todos
  let completedTodos = filteredTodos.filter((t) => t.completed);

  if (completedSort === "asc") {
    completedTodos = [...completedTodos].sort(
      (a, b) =>
        new Date(a.completedAt || 0).getTime() -
        new Date(b.completedAt || 0).getTime()
    );
  } else if (completedSort === "desc") {
    completedTodos = [...completedTodos].sort(
      (a, b) =>
        new Date(b.completedAt || 0).getTime() -
        new Date(a.completedAt || 0).getTime()
    );
  }

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="app">
      <Header />

      <main>
        {/* FILTER */}
        <section className="controls">
          <UserFilter
            users={users}
            selectedUser={selectedUser}
            onChange={setSelectedUser}
          />
        </section>

        <section className="boards">
          <UncompletedSection
            todos={uncompletedTodos}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            visibleCount={visibleCount}
            loadMore={() => setVisibleCount((prev) => prev + 5)}
            getUserName={getUserName}
            onComplete={handleComplete}
          />

          <CompletedSection
            todos={completedTodos}
            completedSort={completedSort}
            setCompletedSort={setCompletedSort}
            getUserName={getUserName}
            onUncomplete={handleUncomplete}
            visibleCount={visibleCount}
            loadMore={() => setVisibleCount(prev => prev + 5)}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
