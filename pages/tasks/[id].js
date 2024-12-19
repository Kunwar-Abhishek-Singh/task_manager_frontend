
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import TaskForm from '../../components/TaskForm';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query; // Get task ID from the URL
  const [task, setTask] = useState(null);

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
  }, [id]); // Dependency on `id` to ensure it runs when `id` changes

  const handleUpdateTask = async (updatedTaskData) => {
    try {
       
      // Send PUT request to the backend with updated task data
      const response = await api.put(`/tasks/${id}`, updatedTaskData);
      console.log('Task updated:', response.data);
      router.push('/'); // Redirect to the main page after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      {/* <h1>Edit Task</h1> */}
      <TaskForm initialData={task} onSubmit={handleUpdateTask} />
    </div>
  );
}


