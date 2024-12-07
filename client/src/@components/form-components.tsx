import { getToday } from "../@utils/utils.ts";

export function Input({id, label, value, setValue }) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 w-full" >
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} required={true} value={value} onChange={(e)=>{setValue(e.target.value)}} className="flex-grow text-black px-1 bg-neutral-200 " />
    </div>
  )
}

export function Select ({id, label, options, value, setValue}) {
  return (
    <div className=" flex flex-row gap-4 items-center" >
      <label htmlFor={id}>{label}</label>
      <select name={label} id={id} className="bg-neutral-200 dark:bg-black hover:bg-neutral-200 hover:dark:bg-neutral-900  px-4 py-2 rounded-md" 
      value={value || ""} onChange={(e)=>{setValue(e.target.value)}} >
        <option value="" disabled>Select an option</option>
        {options.map( (option:string, index:number) => <option key={index} value={option}>{option}</option> )}
      </select>
    </div>
  )
}

function RadioButton ({id, name, value, setValue, checked}) {
  return (
    <li className="*:mx-1 min-w-fit " >
      <input type="radio" id={id} name={name} value={value} onChange={(e)=>{setValue(e.target.value)}} checked={checked} />
      <label htmlFor={id} >{value}</label>
    </li>
  )
}

export function Radio ({groupName, radios, value, setValue}) {
  return (
    <div className="flex gap-8" >
      <span>{groupName}</span>
      <ul className="flex gap-6" >
        {radios.map((radio:string, index:number) => <RadioButton key={index} id={radio} name={groupName} value={radio} setValue={setValue} checked={radio===value}  />  )}
      </ul>
    </div>
  )
}

export function DueDate ({id, value, setValue}) {
  return (
    <div className="flex gap-8 items-center ">
      <label htmlFor={id}>Due Date</label>
      <input type="date" id={id} min={getToday()} value={value} onChange={(e)=>{setValue(e.target.value)}} className="bg-neutral-200 dark:bg-black px-2 py-1 rounded-md" />
    </div>
  )
}