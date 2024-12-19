
import { useRouter } from "next/router";
import api from "../services/api";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  const router = useRouter();

  const handleCreateTask = async (taskData) => {
    try {
        console.log("taskData is: ", taskData)
      await api.post("/tasks", taskData); // Calls POST /tasks
      router.push("/"); // Redirect to task list after successful creation
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      {/* <h1>Create Task</h1> */}
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
}
