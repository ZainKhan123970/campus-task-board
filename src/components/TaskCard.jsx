// Task 2: Reusable component - task data parent (App) se props ke zariye aata hai
function TaskCard({ id, title, category, done, onToggle, onDelete }) {
  return (
    <li className={`card ${done ? "card--done" : ""}`} data-category={category}>
      <button
        className="check"
        onClick={() => onToggle(id)}
        aria-label={done ? "Mark as pending" : "Mark as done"}
      >
        {done && (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
               stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        )}
      </button>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <span className="tag">{category}</span>
      </div>

      <button className="delete" onClick={() => onDelete(id)} aria-label="Delete task">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
        </svg>
      </button>
    </li>
  );
}

export default TaskCard;