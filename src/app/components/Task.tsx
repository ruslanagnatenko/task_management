import classNames from "classnames";
import { TTask } from "../utils";
import TaskActions from "./actions";
import { Fragment } from "react";

interface Props {
  setEditingTask: (arg: TTask | null) => void;
  deleteTask: (arg: TTask) => void;
  task: TTask;
}

export default function Task({ setEditingTask, deleteTask, task }: Props) {
  return (
    <Fragment>
      <div className="p-2 border border-gray-400 text-gray-900 flex justify-between items-center">
        <div className="text-sm">{task.description}</div>
        <div className="flex gap-2 items-center">
          <div
            className={classNames(
              "flex items-center p-1 md:px-5 rounded-md text-[10px] md:text-sm text-white",
              {
                "bg-yellow-500": task.status === "NEW",
                "bg-green-500": task.status === "DONE",
                "bg-blue-500": task.status === "IN PROGRESS",
              }
            )}
          >
            {task.status}
          </div>
          <div
            className={classNames(
              "flex items-center p-1 md:px-5 rounded-md border text-[10px] md:text-sm",
              {
                "border-red-500 text-red-500": task.priority === "LOW",
                "border-green-500 text-green-500": task.priority === "HIGH",
                "border-yellow-500 text-yellow-500": task.priority === "MIDDLE",
              }
            )}
          >
            {task.priority}
          </div>

          <TaskActions
            task={task}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
          />
        </div>
      </div>
    </Fragment>
  );
}
