import TaskItem from "./TaskItem";
import { useState } from "react";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks, removeTask, updateTask, toggleComplete }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (savedTask) => {
    updateTask(savedTask);
    setSelectedTask(null);
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskItem
              task={task}
              removeTask={removeTask}
              toggleComplete={toggleComplete}
            />
            <button onClick={() => handleEditClick(task)}>Edit</button>
          </div>
        ))
      )}
      {selectedTask && (
        <TaskForm task={selectedTask} saveTask={handleSaveTask} />
      )}
    </div>
  );
};

export default TaskList;
