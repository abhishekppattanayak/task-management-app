import { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";
import { Checked, Unchecked } from "./check.tsx";
import { priorityColor } from "../@utils/utils.ts";

function TaskItem (props:TaskInterface) {
  const [completed, setCompleted] = useState<boolean>(props.status === "Completed")
  const toggleChecked = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    setCompleted((prev:boolean) => !prev);
  }, [])

  return (
    <li className={`relative bg-neutral-100 dark:bg-neutral-700 my-2 rounded-sm px-4 py-2 ${completed ? "line-through": ""} `} >
      <div className={`absolute h-full l-0 w-2 rounded-l -ml-4 -mt-2 ${priorityColor(props.priority)}`} ></div>
      <div className="text-wrap flex items-center gap-2 " >
        <button className="inline aspect-square h-4" onClick={toggleChecked} >{completed ? <Checked /> : <Unchecked /> }</button>
        <span>{props.title}</span>
      </div>
      <span className="opacity-75 " >{props.dueDate}</span>

    </li>
  )
}

function TaskList () {

  const { tasks } = useContext(TaskContext);

  const [search, setSearch] = useState<string>("");
  const regex = useMemo(() => new RegExp(`${search}.*`, 'i'), [search]);
  

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const tasklist = useMemo(() => tasks.filter((t:TaskInterface) => t.title.match(regex)), [tasks, regex])

  return (
    <div className="px-4 py-4" >
      <h1 className="font-bold text-xl" >Tasklist</h1>
      <input type="text" value={search} onChange={handleChange} placeholder="Search tasks" className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-sm placeholder:text-white/75 placeholder:dark:text-black/75 w-full " />
      <ul>
        {tasklist.map((taskObject:TaskInterface, index:number) => <TaskItem key={index} {...taskObject} /> )}
      </ul>
    </div>
  )
}




export default function Overview () {
  return (
    <main>
      <TaskList />
    </main>
  )
}