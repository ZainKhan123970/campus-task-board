import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit React assignment", category: "Study" },
    { id: 2, title: "Return library book", category: "Personal" },
    { id: 3, title: "Group project meeting", category: "Project" },
  ]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Task list updated!");
    console.log("Total tasks:", tasks.length);
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: text, category: "General" }]);
    setText("");
  };

  return (
    <div className="board">
      <h1>Campus Task Board</h1>

      <div className="add-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.map((t) => (
        <TaskCard key={t.id} title={t.title} category={t.category} />
      ))}
    </div>
  );
}

export default App;