import axios from "axios";

const TaskItem = ({ task, toggleComplete, removeTask }) => {
  const handleDelete = () => {
    removeTask(task.id);
  };

  const handleToggleComplete = () => {
    toggleComplete(task.id, !task.completed);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
