import { useCallback, useContext } from "react";
import { deleteTask } from "../@utils/utils.ts";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";

export default function DeleteModal ({closeModal, taskId}) {

  const { setTasks } = useContext(TaskContext);

  const handleDelete = useCallback(async () => {
    await deleteTask(taskId);
    setTasks((prev:TaskInterface[]) => prev.filter((t) => t._id !== taskId))
    closeModal();
  }, []);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-white/50 dark:bg-black/50 grid place-items-center z-10 " >
      <div className="bg-neutral-200 dark:bg-neutral-800 dark:text-white rounded-md w-60 md:w-1/3 h-48 md:h-1/4 md:text-xl flex flex-col items-center justify-center gap-8 " >
        <span className="block">Are you sure?</span>
        <span className="*:mx-2 *:rounded-sm *:px-2 *:py-0.5">
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</button>
          <button onClick={closeModal} className="hover:bg-white-100 hover:dark:bg-neutral-900">Cancel</button>
        </span>
      </div>
    </div>
  )
}