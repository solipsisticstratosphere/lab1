let tasks = [];
let currentId = 1;

const getTasks = (req, res) => {
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

const createTask = (req, res) => {
  const newTask = {
    id: currentId++,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.completed =
    req.body.completed !== undefined ? req.body.completed : task.completed;
  res.json(task);
};

const deleteTask = (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
