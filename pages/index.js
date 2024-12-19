
import { useEffect, useState } from "react";
import api from "../services/api"; // Axios instance
import Link from "next/link"; // For navigation

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks"); // Fetch all tasks from the backend
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`); // Send DELETE request to remove the task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/create-task" className="nav-link">Create</Link>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
        </div>
      </nav>

      {/* Task List */}
      <div className="container">
        <h1>Task Management</h1>

        <table className="task-table">
          <thead>
            <tr>
              <th className="table-header">Title</th>
              <th className="table-header">Description</th>
              <th className="table-header">Due Date</th>
              <th className="table-header">Priority</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="table-row">
                  <td className="table-cell">{task.title}</td>
                  <td className="table-cell">{task.description}</td>
                  <td className="table-cell">{new Date(task.dueDate).toLocaleDateString('en-GB')}</td>
                  <td className="table-cell">{task.priority}</td>
                  <td className="table-cell">
                  <Link href={`/task/${task._id}`} className="button">View</Link>
                    <Link href={`/tasks/${task._id}`} className="button">Edit</Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="button button-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

