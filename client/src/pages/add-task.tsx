import { useState, useRef, useMemo, useCallback, useContext } from "react";
import { DueDate, Input, Select } from "../@components/form-components.tsx"
import { addNewTask, getToday } from "../@utils/utils.ts";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";
import { useNavigate } from "react-router-dom";

export default function AddTask () {

  const { setTasks } = useContext(TaskContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High");
  const status = useRef("Pending")
  const [due, SetDue] = useState(getToday());

  const NewTask = useMemo(() => {
    return {
      id: crypto.randomUUID(),
      title: title,
      priority: priority,
      status: status.current,
      dueDate: due,
      group: "",
    }
  }, [title, priority, due])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setTasks((prev:TaskInterface[]) => [...prev, NewTask]);
    (async()=>{
      await addNewTask(NewTask);
    })();
    navigate('/')
  }, [NewTask])

  return (
    <div className="h-screen dark:bg-neutral-900 dark:text-white flex justify-center items-center">
      <form className="mx-4 w-full md:w-1/2" >
        <fieldset className="px-24 py-12 flex flex-col gap-4 rounded-md border-2 border-black dark:border-white  ">
          <h1 className="font-bold dark:text-white text-xl text-center" >Add Task</h1>
          <Input id={'add-title'} label={"Title"} value={title} setValue={setTitle}  />
          <Select id={'add-priority'} label={"Priority"} value={priority} setValue={setPriority} options={["High", "Medium", "Low"]} />
          <DueDate id={'add-due'} value={due} setValue={SetDue} />
          <span className="self-center *:mx-4" >
            <button onClick={handleSubmit} type="submit" className="bg-black text-white dark:bg-white dark:text-black px-8 py-1 rounded-sm" >Add</button>
            <button onClick={(e)=>{e.preventDefault(); navigate(-1)}} className="px-8 py-1 rounded-sm hover:bg-neutral-300 hover:dark:bg-neutral-950" >Cancel</button>
          </span>
        </fieldset>
      </form>
    </div>
  )
}