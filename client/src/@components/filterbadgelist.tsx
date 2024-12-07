import { useContext } from "react";
import { FilterContext } from "../@contexts/contexts.tsx";
import FilterSvg from "./filter.svg.tsx";

function FilterBadge ({filter, setValue }) {
  return (
    <div onClick={()=>{setValue(undefined)}} className="px-2 py-1 rounded-sm flex items-center *:mx-1 bg-neutral-300 dark:bg-neutral-500 " >
      <span className="w-fit" ><FilterSvg className="w-6 aspect-square" /></span>
      <span>{filter}</span>
    </div>
  )
}

export default function FilterBadgeList () {

  const { statusFilter, setStatusFilter, priorityFilter, setPriorityFilter } = useContext(FilterContext);

  return (
    <div className="h-fit mt-4 -mb-2 flex flex-row gap-8">
      { (statusFilter || priorityFilter) && <span className="font-bold my-auto " >Clear filters:</span> }
      { statusFilter && <FilterBadge filter={statusFilter} setValue={setStatusFilter} />  }
      { priorityFilter && <FilterBadge filter={priorityFilter} setValue={setPriorityFilter} /> }
    </div>
  )
}