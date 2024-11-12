"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import Task, { Priority, Status, TTask } from "./utils";
import EditTaskForm from "./components/form/EditTaskForm";
import Tasks from "./components/Tasks";

export default function Home() {
  const [tasks, setTasks] = useState<TTask[]>(
    JSON.parse(localStorage.getItem("tasks")!) || []
  );
  const [editingTask, setEditingTask] = useState<TTask | null>(null);
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<Status>("NEW");
  const [newPriority, setNewPriority] = useState<Priority>("MIDDLE");
  const [error, setError] = useState("");

  const createTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = e.target as HTMLInputElement;
      const newTask = new Task(inputElement.value);

      if (!inputElement.value.trim()) {
        setError("You can't create task without description");
        return;
      }

      setTasks((prevTasks) => {
        const tasksToSet = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(tasksToSet));
        return tasksToSet;
      });
      inputElement.value = "";
    }
  };

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDesc || !newStatus || !newPriority || !editingTask) {
      return;
    }

    editingTask.updateDescription(newDesc);
    editingTask.updateStatus(newStatus as Status);
    editingTask.updatePriority(newPriority as Priority);

    const tasksToSet = tasks.map((t) =>
      t.id === editingTask.id ? editingTask : t
    );
    setTasks(tasksToSet);
    localStorage.setItem("tasks", JSON.stringify(tasksToSet));

    setEditingTask(null);
  };

  const deleteTask = (task: TTask) => {
    const tasksToSet = tasks.filter((t) => t.id !== task.id);
    setTasks(tasksToSet);
    localStorage.setItem("tasks", JSON.stringify(tasksToSet));
  };

  useEffect(() => {
    if (editingTask) {
      setNewDesc(editingTask.description);
      setNewStatus(editingTask.status);
      setNewPriority(editingTask.priority);
    }
  }, [editingTask]);

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-10/12 xl:w-1/2">
        <input
          className="border border-gray-500 rounded-md w-full p-5 text-gray-900"
          placeholder="Create new task"
          onKeyUp={createTask}
          onChange={() => setError("")}
        />
        {error && <p className="text-red-500">{error}</p>}

        {editingTask ? (
          <EditTaskForm
            updateTask={updateTask}
            setEditingTask={setEditingTask}
            setNewDesc={setNewDesc}
            setNewPriority={setNewPriority}
            setNewStatus={setNewStatus}
            newDesc={newDesc}
            newStatus={newStatus}
            newPriority={newPriority}
          />
        ) : (
          <Tasks
            setEditingTask={setEditingTask}
            tasks={tasks}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
}
