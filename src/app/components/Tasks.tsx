import { TTask } from "../utils";
import Task from "./Task";

interface Props {
  tasks: TTask[];
  setEditingTask: (arg: TTask | null) => void;
  deleteTask: (arg: TTask) => void;
}

export default function Tasks({ tasks, setEditingTask, deleteTask }: Props) {
  return (
    <div className="flex flex-col gap-3 max-h-64 overflow-auto">
      {tasks.map((task) => (
        <Task
          task={task}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          key={task.id}
        />
      ))}
    </div>
  );
}
