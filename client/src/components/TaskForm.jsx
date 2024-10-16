import { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ task, saveTask }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
    };

    if (task && task.id) {
      axios
        .put(`/api/tasks/${task.id}`, taskData)
        .then((response) => {
          saveTask(response.data);
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    } else {
      axios
        .post("/api/tasks", taskData)
        .then((response) => {
          saveTask(response.data);
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">{task?.id ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
