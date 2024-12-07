import { BrowserRouter, Routes, Route } from "npm:react-router-dom";
import { useMemo, useEffect, useState, useCallback } from "react";
import Index from "./pages/index.tsx";
import EditTask from "./pages/edit-task.tsx";
import Error404 from "./pages/404.tsx";
import { TaskInterface, RouteInterface } from "./@types/interfaces.ts";
import { Theme } from "./@types/types.ts"
import { ThemeContext, TaskContext } from "./@contexts/contexts.tsx";
import { createRouteObject } from "./@utils/utils.ts";
import AddTask from "./pages/add-task.tsx";

export default function App ({prefetchTasks}: {prefetchTasks: TaskInterface[]}) {

  const [theme, setTheme] = useState<Theme>( localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' );
  
  const toggleTheme = useCallback(():void => {
    localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    setTheme((prev:string) => prev === 'dark' ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark');
  }, []) 

  useEffect(() => {
    if (theme === 'dark')
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
      <ThemeContext.Provider value={{theme, toggleTheme}} >
        <BrowserRouter>
          <Routes>
            {routes.map((route:RouteInterface, key:number) => <Route key={key} path={route.path} element={route.element} /> )}
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </TaskContext.Provider>
  )
}