import { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";
import { Checked, Unchecked } from "./check.tsx";
import { priorityColor } from "../@utils/utils.ts";
import EditSvg from "./edit.svg.tsx";
import { useNavigate } from "react-router-dom";
import { updateChecked } from "../@utils/utils.ts";

function TaskItem (props:TaskInterface) {
  const { setTasks } = useContext(TaskContext);

  const [completed, setCompleted] = useState<boolean>(props.status === "Completed")
  const toggleChecked = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    setCompleted((prev:boolean) => !prev);
  }, [])

  useEffect(() => {
    const st = completed ? "Completed" : "Pending"
    setTasks((prev:TaskInterface[]) => prev.map(p => p._id===props._id ? {...p, status: st } : p ));
    (async()=>{
      await updateChecked(props._id, completed)
    })()
  }, [completed])

  const navigate = useNavigate();

  return (
    <li className={`relative bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-700 hover:dark:bg-neutral-800 my-2 rounded-sm px-4 py-2 ${completed ? "line-through": ""} `} >
      <div className={`absolute h-full l-0 w-2 rounded-l -ml-4 -mt-2 ${priorityColor(props.priority)}`} ></div>
      <div className="text-wrap flex items-center gap-2 py-2 " >
        <button className="inline aspect-square h-4" onClick={toggleChecked} >{completed ? <Checked /> : <Unchecked /> }</button>
        <span className="flex-grow" >{props.title}</span>
        <span onClick={()=>{navigate(`/edit-task/${props.id}`)}} ><EditSvg className="h-5 md:h-6 aspect-square" /></span>

      </div>
      <span className="opacity-75 " >{props.dueDate}</span>
    </li>
  )
}

function TaskList () {

  const { tasks }: {tasks: TaskInterface[]} = useContext(TaskContext);

  const [search, setSearch] = useState<string>("");
  const regex = useMemo(() => new RegExp(`${search}.*`, 'i'), [search]);
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const tasklist = useMemo(() => tasks.filter((t:TaskInterface) => t.title.match(regex)), [tasks, regex])

  return (
    <div className="px-4 py-4 h-screen flex flex-col overflow-scroll " >
      <h1 className="font-bold text-xl my-2" >Tasklist</h1>
      <input type="text" value={search} onChange={handleChange} placeholder="Search tasks" className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-white hover:dark:bg-neutral-200 text-black rounded-sm placeholder:text-black/75 w-full " />
      <ul className="flex-grow overflow-scroll my-4" >
        {tasklist.map((taskObject:TaskInterface, index:number) => <TaskItem key={index} {...taskObject} /> )}
      </ul>
    </div>
  )
}




export default function Overview ({className} : { className: string } ) {
  return (
    <main className={`${className}`} >
      <TaskList />
    </main>
  )
}