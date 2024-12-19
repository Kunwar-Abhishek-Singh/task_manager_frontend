import Link from "next/link";

export default function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <Link href={`/tasks/${task._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
