import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET all tasks
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (taskData) => API.post("/tasks", taskData);

// UPDATE task
export const updateTask = (id, updatedData) =>
  API.put(`/tasks/${id}`, updatedData);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);