import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import "./App.css";

const CATEGORIES = ["Study", "Project", "Exam", "Personal", "Sports"];

function App() {
  // Task 1: tasks useState mein (id, title, category)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish React assignment", category: "Study", done: false },
    { id: 2, title: "Prepare slides for group project", category: "Project", done: false },
    { id: 3, title: "Revise Web Engineering notes", category: "Exam", done: false },
    { id: 4, title: "Return library books", category: "Personal", done: true },
  ]);

  // Task 3: input fields ki state
  const [text, setText] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [filter, setFilter] = useState("All");

  // Dark / Light theme
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("ctb-theme");
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Task 4: useEffect - jab bhi tasks change hon, console mein output
  useEffect(() => {
    console.log("Task list updated!");
    console.log("Total tasks:", tasks.length);
  }, [tasks]);

  // Theme apply karna
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("ctb-theme", theme); } catch (e) {}
  }, [theme]);

  // Task 3: naya task add karna (form onSubmit)
  const handleAddTask = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, category, done: false }]);
    setText("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const visibleTasks = filter === "All" ? tasks : tasks.filter((t) => t.category === filter);
  const doneCount = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="app">
      <div className="blob blob--1" />
      <div className="blob blob--2" />

      <main className="board">
        <header className="header">
          <div>
            <p className="eyebrow">Advanced Web Engineering</p>
            <h1>Campus Task Board</h1>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle dark / light"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </header>

        <section className="stats">
          <div className="stat"><strong>{tasks.length}</strong><span>Total</span></div>
          <div className="stat"><strong>{tasks.length - doneCount}</strong><span>Pending</span></div>
          <div className="stat"><strong>{doneCount}</strong><span>Done</span></div>
        </section>
        <div className="progress" aria-label={`${progress}% completed`}>
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Task 3: input + Add Task button */}
        <form className="add-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you need to do?"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="btn-add">Add Task</button>
        </form>

        <div className="filters">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              className={`chip ${filter === c ? "chip--active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Task 1: .map() + unique key | Task 2: TaskCard + props */}
        <ul className="list">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              done={task.done}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        {visibleTasks.length === 0 && (
          <p className="empty">No tasks here yet. Add one above!</p>
        )}
      </main>
    </div>
  );
}

export default App;