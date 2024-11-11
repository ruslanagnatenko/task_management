"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import Task, { Priority, Status, TTask } from "./utils";
import EditTaskForm from "./components/form/EditTaskForm";
import Tasks from "./components/Tasks";

export default function Home() {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [editingTask, setEditingTask] = useState<TTask | null>(null);
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<Status>("NEW");
  const [newPriority, setNewPriority] = useState<Priority>("MIDDLE");

  const createTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = e.target as HTMLInputElement;
      const newTask = new Task(inputElement.value);
      newTask.updateDescription = newTask.updateDescription;
      newTask.updatePriority = newTask.updatePriority;
      newTask.updateStatus = newTask.updateStatus;
      const tasksToSet = [...tasks, newTask];
      setTasks(tasksToSet);
      inputElement.value = "";
      localStorage.setItem("tasks", JSON.stringify(tasksToSet));
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
    const tasksFromStorage: TTask[] =
      typeof window !== "undefined" && localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : [];
    setTasks(tasksFromStorage);
  }, []);

  useEffect(() => {
    if (editingTask) {
      setNewDesc(editingTask.description);
      setNewStatus(editingTask.status);
      setNewPriority(editingTask.priority);
    }
  }, [editingTask]);

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-1/2">
        <input
          className="border border-gray-500 rounded-md w-full p-5 text-gray-900"
          placeholder="Create new task"
          onKeyUp={createTask}
        />

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
