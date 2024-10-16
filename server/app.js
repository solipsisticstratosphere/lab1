const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);

module.exports = app;
