import axios from "axios";

// Axios instance banate waqt baseURL aise set karte hain:
const API = axios.create({
  baseURL: "https://mern-task-tracker-a31s.onrender.com"
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
