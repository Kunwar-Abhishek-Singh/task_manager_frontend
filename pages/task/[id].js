import api from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function taskView() {
    const router = useRouter();
    const { id } = router.query; // Get task ID from the URL
    const [task, setTask] = useState(null);
    //   const [formData, setFormData] = useState({
    //     title: initialData.title || "",
    //     description: initialData.description || "",
    //     dueDate: initialData.dueDate || "",
    //     priority: initialData.priority || "Low",
    //   });

    useEffect(() => {
        // Only fetch task when the id is available
        if (id) {
            const fetchTask = async () => {
                try {
                    const response = await api.get(`/tasks/${id}`); // Fetch task details from backend
                    setTask(response.data); // Populate the task state with the fetched task
                } catch (error) {
                    console.error("Error fetching task:", error);
                }
            };
            fetchTask();
        }
    }, [id]);

    console.log("task is: ", task)

    //   const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(formData);
    //   };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">{"View Task"}</h3>
                </div>
                <div className="card-body">
                    <form >
                        {/* Title Input */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={task && task.title && task.title}
                                // onChange={handleChange}
                                placeholder="Enter task title"
                                className="form-control"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={task && task.description && task.description}
                                // onChange={handleChange}
                                placeholder="Enter task description"
                                rows="4"
                                className="form-control"
                            ></textarea>
                        </div>

                        {/* Due Date Input */}
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={task && task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                                // onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        {/* Priority Selector */}
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={task && task.priority && task.priority}
                                // onChange={handleChange}
                                className="form-select"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        {/* <div>
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Save
              </button>
            </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}