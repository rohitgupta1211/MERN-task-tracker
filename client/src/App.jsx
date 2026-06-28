import { useEffect, useState } from "react";
import { getTasks } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 🛠️ ADD TASK (Render URL Fixed)
  const addTask = async (e) => {
    e.preventDefault();
    
    // Validation Check
    if (!title.trim() || !description.trim()) {
      alert("⚠️ Please enter both a valid Task Title and Description!");
      return;
    }

    await fetch("https://mern-task-tracker-a31s.onrender.com/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // 🛠️ DELETE TASK (Render URL Fixed)
  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      await fetch(`https://mern-task-tracker-a31s.onrender.com/api/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // 🛠️ UPDATE TASK (Render URL Fixed)
  const updateTask = async (e) => {
    e.preventDefault();

    // Validation Check
    if (!title.trim() || !description.trim()) {
      alert("⚠️ Update failed! Title and Description cannot be left empty.");
      return;
    }

    await fetch(`https://mern-task-tracker-a31s.onrender.com/api/tasks/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });

    setEditingId(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-blue-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              ✨ TaskFlow Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">Efficiently track your web development milestones</p>
          </div>
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 placeholder-slate-500 transition-all"
            />
          </div>
        </header>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ACTION PANEL */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              {editingId ? "📝 Edit Task Details" : "🚀 Launch New Task"}
            </h2>
            <form onSubmit={editingId ? updateTask : addTask} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g., Code Gym App UI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  placeholder="Add details or core focus areas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-xl text-white transition-all transform active:scale-98 cursor-pointer ${
                    editingId ? "bg-amber-500 hover:bg-amber-400" : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {editingId ? "Update Milestone" : "Add Task"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setTitle(""); setDescription(""); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium px-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TASKS VIEW */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                📋 Live Workspace
              </h2>
              <span className="text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full">
                {tasks.length} Active {tasks.length === 1 ? 'Task' : 'Tasks'}
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-slate-900/20 border border-slate-800 border-dashed rounded-2xl p-12 text-center text-slate-500">
                <p className="text-base font-semibold text-slate-400">All caught up!</p>
                <p className="text-xs text-slate-600 mt-1">Create your first technical task to begin tracking.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks
                  .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-slate-900/30 border border-slate-800/80 hover:border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-950/20 group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="font-bold text-slate-200 text-base tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                            {task.title}
                          </h3>
                          <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 uppercase whitespace-nowrap">
                            In Progress
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                          {task.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/40">
                        <button
                          onClick={() => startEdit(task)}
                          className="flex items-center gap-1 bg-slate-900 hover:bg-amber-500/10 hover:text-amber-400 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer"
                        >
                          ⚙️ Modify
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="flex items-center gap-1 bg-slate-900 hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 hover:border-rose-500/20 transition-all cursor-pointer"
                        >
                          🗑️ Discard
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
