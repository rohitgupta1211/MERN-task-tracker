import axios from "axios";


const API = axios.create({
  baseURL: "https://mern-task-tracker-a31s.onrender.com/api" 
});

// GET all tasks -> Isse automatic request ".../api/tasks" par jayegi
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (taskData) => API.post("/tasks", taskData);

// UPDATE task
export const updateTask = (id, updatedData) =>
  API.put(`/tasks/${id}`, updatedData);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
