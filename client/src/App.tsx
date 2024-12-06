import { BrowserRouter, Routes, Route } from "npm:react-router-dom";
import { useMemo, useEffect, useRef, useState } from "react";
import Index from "./pages/index.tsx";
import EditTask from "./pages/edit-task.tsx";
import Error404 from "./pages/404.tsx";
import { TaskInterface, RouteInterface } from "./@types/interfaces.ts";
import { Theme } from "./@types/types.ts"
import { ThemeContext, TaskContext } from "./@contexts/contexts.tsx";
import { createRouteObject, toggleTheme } from "./@utils/utils.ts";
import AddTask from "./pages/add-task.tsx";

export default function App ({prefetchTasks}: {prefetchTasks: TaskInterface[]}) {

  const theme = useRef<Theme>( localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' );
  useEffect(() => {
    if (theme.current === 'dark')
      document.documentElement.classList.add('dark')
  }, [])
  
  const [tasks, setTasks] = useState<TaskInterface[]>(prefetchTasks);
  
  const routes = useMemo(() => [
    createRouteObject('/', <Index /> ),
    createRouteObject('/edit-task/:id', <EditTask /> ),
    createRouteObject('/add-task', <AddTask /> ),
    createRouteObject('*', <Error404/> ),
  ], [])

  return (
    <TaskContext.Provider value={{tasks, setTasks}} >
      <ThemeContext.Provider value={toggleTheme} >
        <BrowserRouter>
          <Routes>
            {routes.map((route:RouteInterface, key:number) => <Route key={key} path={route.path} element={route.element} /> )}
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </TaskContext.Provider>
  )
}