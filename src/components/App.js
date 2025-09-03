
import React, { useMemo, useState } from "react";
import './../styles/App.css';

function generateTasks() {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Task ${i}`,
      completed: i > 25 // first 25 active, next 25 completed
    });
  }
  return tasks;
}

function SlowTaskItem({ task }) {
  let start = performance.now();
  while (performance.now() - start < 3) {} // block for 3ms
  return <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</li>;
}

const App = () => {
   const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Generate tasks once
  const tasks = useMemo(() => generateTasks(), []);

   // Filter tasks with useMemo
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true; // fallback
    });
  }, [filter, tasks]);
  return (
    <div className={darkMode ? "dark" : "light"}>
      <h1>Todo App (useMemo Performance)</h1>

      {/* Filter buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Dark mode toggle */}
      <button onClick={() => setDarkMode((prev) => !prev)}>
        Toggle Dark Mode
      </button>

      {/* Render filtered tasks */}
      <ul>
        {filteredTasks.map((task) => (
          <SlowTaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default App;