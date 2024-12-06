import { useState, useCallback, useEffect } from "react";

function BiggerScreen () {
  return (
    <div className="rounded-r-xl" >

    </div>
  )
}

function SmallerScreen () {

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {setOpen((prev:boolean) => !prev)}, []);

  return (
    <div>
      {!open ?
      <button onClick={() => {setOpen(true)}} ></button> 
      : <div className="" >

      </div> }
    </div>
  )
}

export default function Sidebar ({className} : { className: string }) {

  const [isBiggerScreen, setIsBiggerScreen] = useState<boolean>(false);

  const handleResize = useCallback(() => {setIsBiggerScreen(globalThis.innerWidth >= 768)})

  useEffect (() => {
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  })

  return (
    <aside className={`${className} fixed md:static dark:bg-neutral-800 `} >
      { isBiggerScreen ? <BiggerScreen /> : <SmallerScreen /> }
    </aside>
  )
}