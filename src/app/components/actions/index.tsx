import { useState } from "react";
import { TTask } from "@/app/utils";

interface Props {
  setEditingTask: (arg: TTask | null) => void;
  deleteTask: (arg: TTask) => void;
  task: TTask;
}

const WarningModal = ({
  isVisible,
  onClose,
  onConfirm,
}: {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to delete your task?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TaskActions({
  setEditingTask,
  deleteTask,
  task,
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = () => {
    deleteTask(task);
    setIsModalVisible(false);
  };

  return (
    <div className="flex space-x-2 ml-4 items-center">
      <button className="text-gray-600 text-sm" onClick={() => setEditingTask(task)}>
        edit
      </button>
      <button
        className="text-red-500 text-sm"
        onClick={() => setIsModalVisible(true)}
      >
        delete
      </button>

      <WarningModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
