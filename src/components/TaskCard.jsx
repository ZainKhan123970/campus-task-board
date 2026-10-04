function TaskCard({ title, category }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span className="tag">{category}</span>
    </div>
  );
}

export default TaskCard;