import { Priority, Status, TTask } from "@/app/utils";

interface Props {
  updateTask: (e: React.FormEvent) => void;
  setNewDesc: (arg: string) => void;
  newDesc: string;
  newStatus: Status;
  setNewStatus: (arg: Status) => void;
  newPriority: Priority;
  setNewPriority: (arg: Priority) => void;
  setEditingTask: (arg: TTask | null) => void;
}

export default function EditTaskForm({
  updateTask,
  setNewDesc,
  setNewStatus,
  newDesc,
  newPriority,
  newStatus,
  setNewPriority,
  setEditingTask,
}: Props) {
  return (
    <form className="w-full" onSubmit={updateTask}>
      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 border border-gray-400 text-gray-900 flex justify-between items-center mb-2"
        onChange={(e) => setNewDesc(e.target.value)}
        value={newDesc}
      />

      <select
        className=" w-full p-2 border border-gray-400 text-gray-900 mb-2"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value as Status)}
      >
        <option value="NEW">NEW</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select
        className="w-full p-2 border border-gray-400 text-gray-900 mb-2"
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value as Priority)}
      >
        <option value="LOW">LOW</option>
        <option value="MIDDLE">MIDDLE</option>
        <option value="HIGH">HIGH</option>
      </select>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-400 text-white text-sm py-2 px-8 rounded-md text-center mt-5"
        >
          Update task
        </button>
        <button
          className="border border-gray-400 text-gray-800 text-sm py-2 px-8 rounded-md text-center mt-5"
          onClick={() => setEditingTask(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
