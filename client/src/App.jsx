import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (id) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const toggleComplete = (id, completed) => {
    axios
      .put(`/api/tasks/${id}`, { completed })
      .then((response) => {
        const updatedTask = response.data;
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm saveTask={addTask} />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        updateTask={updateTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
