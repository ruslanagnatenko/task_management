import { TTask } from "@/app/utils";

interface Props {
  setEditingTask: (arg: TTask | null) => void;
  deleteTask: (arg: TTask) => void;
  task: TTask;
}

export default function TaskActions({
  setEditingTask,
  deleteTask,
  task,
}: Props) {
  return (
    <div className="flex space-x-2 ml-4 items-center">
      <button className="text-gray-600" onClick={() => setEditingTask(task)}>
        edit
      </button>
      <button className="text-red-500" onClick={() => deleteTask(task)}>
        delete
      </button>
    </div>
  );
}
