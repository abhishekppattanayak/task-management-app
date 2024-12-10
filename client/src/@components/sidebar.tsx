import { useState, useContext } from "react";
import MenuSvg from "./menu.svg.tsx";
import CloseSvg from "./close.svg.tsx";
import { FilterContext, ThemeContext } from "../@contexts/contexts.tsx";
import { Select } from "./form-components.tsx";

export default function Sidebar ({className} : { className: string }) {

  const { statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, dateSort, setDateSort } = useContext(FilterContext);

  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
    {open ?
     <div className="absolute w-full z-10 px-4 flex flex-col gap-4 bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white rounded-b-md md:static md:max-w-fit lg:rounded-b-0 lg:rounded-r-md py-4 lg:items-start lg:px-8 " >

      <button onClick={()=>{setOpen(false)}} className="lg:-ml-2" ><CloseSvg className="h-8" /></button>

      <Select id='filter-status' label='Filter by status' options={['Completed', 'Pending']} setValue={setStatusFilter} value={statusFilter}  />

      <Select id='filter-priority' label='Filter by priority' options={['High', 'Medium', 'Low']} setValue={setPriorityFilter} value={priorityFilter} />

      <Select id='sort-date' label='Sort by Due Date' options={['Ascending', 'Descending']} setValue={setDateSort} value={dateSort} />

      <button onClick={()=>{toggleTheme()}} className="px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black w-32 self-center" >{theme !== 'dark' ? "Light Mode" : "Dark Mode"}</button>

     </div> 
     : 
     <button className="mt-4 self-start " onClick={()=>{setOpen(true)}}><MenuSvg className="h-8" /></button> 
    }
    </>
  )
}