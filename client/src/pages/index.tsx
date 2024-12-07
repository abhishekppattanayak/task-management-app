import Sidebar from "../@components/sidebar.tsx";
import Overview from "../@components/overview.tsx";
import { FilterContext, TaskContext } from "../@contexts/contexts.tsx";
import { Priority, Status } from "../@types/types.ts";
import { useState, useContext, useEffect } from "react"
import { TaskInterface } from "../@types/interfaces.ts";

export default function Index () {

  const { tasks }: {tasks: TaskInterface[]} = useContext(TaskContext);
  
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<Priority | undefined>(undefined)

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>(tasks);

  useEffect(() => {
    const filtered = tasks.filter((task: TaskInterface) => {
      const statusMatch = statusFilter ? task.status === statusFilter : true;
      const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
      return statusMatch && priorityMatch;
    });

    setFilteredTasks(filtered);
  }, [tasks, statusFilter, priorityFilter]);
  
  return (
    <div className="h-screen dark:bg-neutral-900 dark:text-white flex flex-col md:flex-row" >
      <FilterContext.Provider value={{ filteredTasks, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter }} >
        <Sidebar className="" />
        <Overview className="flex-grow-[5]" />
      </FilterContext.Provider>
    </div>
  )
}