import { useContext, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";
import { DueDate, Input, Radio, Select } from "../@components/form-components.tsx";
import { updateTask } from "../@utils/utils.ts";

export default function EditTask () {
  const { tasks, setTasks } = useContext(TaskContext);

  const { id } : { id: string } = useParams();

  const { _id, title, status, priority, dueDate, group } = tasks.find((t: TaskInterface) => t.id === id)

  const [titleState, setTitleState] = useState (title)
  const [priorityState, setPriorityState] = useState(priority)
  const [statusState, setStatusStatus] = useState(status);
  const [dueState, setDueState] = useState(dueDate);

  const NewTask = useMemo(()=>{
    return {
      id: id,
      title: titleState,
      status: statusState,
      priority: priorityState,
      dueDate: dueState,
    }
  }, [titleState, priorityState, statusState, dueState])

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e:React.FormEvent<HTMLFormElement> )=>{
    e.preventDefault();
    await updateTask(_id, NewTask)
    setTasks((prev:TaskInterface[]) => prev.map( (p) => p.id === id ? NewTask : p))
    navigate('/')
  }, [NewTask])

  return (
    <div className="h-screen dark:bg-neutral-900 dark:text-white flex justify-center items-center ">
      <form className="mx-4 w-full md:w-1/2 " >
        <fieldset className="px-24 py-12 flex flex-col gap-4 rounded-md border-2 border-black dark:border-white" >
          <h1 className="font-bold dark:text-white text-xl text-center" >Edit Task</h1>
          <Input id={"edit-title"} label={"Title"} value={titleState} setValue={setTitleState}  />
          <Select id={"edit-priority"} label={"Priority"} options={["High", "Medium", "Low"]} value={priorityState} setValue={setPriorityState} />
          <Radio groupName={"Status"} radios={["Completed", "Pending"]} value={statusState} setValue={setStatusStatus}  />
          <DueDate id={"edit-due"} value={dueState} setValue={setDueState} />
          <button type="submit" onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black rounded-sm self-center px-8 py-1 " >Save</button>
        </fieldset>
      </form>
    </div>
  )
}