import TaskList from "./tasklist.tsx"

export default function Overview ({className} : { className: string } ) {
  return (
    <main className={`${className} md:px-8 lg:px-16 xl:px-24 `} >
      <TaskList />
    </main>
  )
}