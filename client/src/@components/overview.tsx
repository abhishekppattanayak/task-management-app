import { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { TaskContext } from "../@contexts/contexts.tsx";
import { TaskInterface } from "../@types/interfaces.ts";
import { Checked, Unchecked } from "./check.tsx";
import { priorityColor } from "../@utils/utils.ts";
import EditSvg from "./edit.svg.tsx";
import { useNavigate } from "react-router-dom";
import { updateChecked } from "../@utils/utils.ts";
import DeleteSvg from "./delete.svg.tsx";
import DeleteModal from "./delete-modal.tsx";

function TaskItem (props: any) {
  const { setTasks } = useContext(TaskContext);
  const _id = useMemo(() => props._id, []);

  const [completed, setCompleted] = useState<boolean>(props.status === "Completed")
  const toggleChecked = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    setCompleted((prev:boolean) => !prev);
  }, [])

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      const st = completed ? "Completed" : "Pending"
      setTasks((prev:TaskInterface[]) => prev.map(p => p._id===_id ? {...p, status: st } : p ));
      (async()=>{
        await updateChecked(_id, st)
      })()
    }
    return () => {
      ignore = true;
    }
  }, [completed])

  const navigate = useNavigate();

  return (
    <li className={`relative bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-700 hover:dark:bg-neutral-800 my-2 rounded-sm px-4 md:px-6 xl:px-8 py-2 ${completed ? "line-through": ""} flex items-center `} >
      <div className={`absolute h-full l-0 w-2 md:w-3 xl:w-4 rounded-l -ml-4 md:-ml-6 xl:-ml-8 ${priorityColor(props.priority)}`} ></div>
      <div className="flex-grow py-2 " >
        <div className="text-wrap flex items-center gap-2" >
          <button className="inline aspect-square h-4" onClick={toggleChecked} >{completed ? <Checked /> : <Unchecked /> }</button>
          <span className="flex-grow md:text-lg" >{props.title}</span>

        </div>
        <span className="opacity-75 " >{props.dueDate}</span>
      </div>
      <span onClick={()=>{navigate(`/edit-task/${props.id}`)}} ><EditSvg className="h-6 md:h-8 aspect-square" /></span>
      <span onClick={()=>{props.openModal(); props.setTaskId()}}><DeleteSvg className="h-8 md:h-10 aspect-square" /></span>
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

  const navigate = useNavigate();

  const [modal, setModal] = useState(false)
  const [taskId, setTaskId] = useState("")

  return (
    <div className="px-4 py-4 h-screen flex flex-col overflow-scroll " >
      <div className="flex justify-between items-center" >
        <h1 className="font-bold text-xl my-2" >Tasklist</h1>
        <button onClick={()=>navigate('/add-task')} className="bg-neutral-500 dark:bg-neutral-700 px-4 rounded-sm text-nowrap " >Add Task</button>
      </div>
      <input type="text" value={search} onChange={handleChange} placeholder="Search tasks" className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-white hover:dark:bg-neutral-200 text-black rounded-sm placeholder:text-black/75 w-full " />
      <ul className="flex-grow overflow-scroll my-4" >
        {tasklist.map((taskObject:TaskInterface, index:number) => <TaskItem key={index} {...taskObject} setTaskId={()=>{setTaskId(taskObject._id)}} openModal={()=>{setModal(true)}} /> )}
      </ul>
      {modal && 
        <DeleteModal closeModal={()=>{setModal(false)}} taskId={taskId} /> 
      }
    </div>
  )
}

export default function Overview ({className} : { className: string } ) {
  return (
    <main className={`${className} md:px-8 lg:px-16 xl:px-24 `} >
      <TaskList />
    </main>
  )
}