import { useState } from "react";
import { TTask } from "../utils";
import Task from "./Task";
import Filters from "./Filters";
import Sort from "./Sort";

interface Props {
  tasks: TTask[];
  setEditingTask: (arg: TTask | null) => void;
  deleteTask: (arg: TTask) => void;
}

export default function Tasks({ tasks, setEditingTask, deleteTask }: Props) {
  const [filter, setFilter] = useState({
    status: "",
    priority: "",
  });
  const [sortStatuses, setSortStatuses] = useState<string[]>([]);

  const toggleSortStatus = (status: string) => {
    setSortStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = !filter.status || task.status === filter.status;
    const priorityMatch = !filter.priority || task.priority === filter.priority;
    return statusMatch && priorityMatch;
  });

  const preparedTasks = sortStatuses.length
    ? [...filteredTasks].sort((a, b) => {
        const aIndex = sortStatuses.indexOf(a.status);
        const bIndex = sortStatuses.indexOf(b.status);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      })
    : filteredTasks;

  return (
    <div className="flex flex-col gap-3 max-h-64 overflow-auto">
      {tasks.length > 0 && (
        <div className="flex flex-col gap-2 mb-2">
          <Filters filter={filter} setFilter={setFilter} />

          <Sort
            sortStatuses={sortStatuses}
            toggleSortStatus={toggleSortStatus}
          />
        </div>
      )}

      {preparedTasks.length > 0 &&
        preparedTasks.map((task) => (
          <Task
            task={task}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
            key={task.id}
          />
        ))}

      {!preparedTasks.length && tasks.length > 0 && (
        <p className="text-gray-500">No tasks</p>
      )}
    </div>
  );
}
