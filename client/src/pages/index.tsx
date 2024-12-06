import Sidebar from "../@components/sidebar.tsx";
import Overview from "../@components/overview.tsx";

export default function Index () {
  return (
    <div className="h-screen dark:bg-neutral-900 dark:text-white flex flex-col md:flex-row " >
      <Overview className="flex-grow-[5]" />
    </div>
  )
}