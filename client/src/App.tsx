import { BrowserRouter, Routes, Route } from "npm:react-router-dom";
import { useMemo, useEffect, useRef, useState } from "react";
import Index from "./pages/index.tsx";
import EditTask from "./pages/edit.tsx";
import Error404 from "./pages/404.tsx";
import { SERVER_URL } from "./config/secrets.js";
import { Task, RouteInterface } from "./@types/interfaces.ts";
import { Theme } from "./@types/types.ts"
import { ThemeContext, TaskContext } from "./@contexts/contexts.tsx";
import { createRouteObject, toggleTheme } from "./@utils/utils.ts";

export default function App () {

  const theme = useRef<Theme>( localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' );
  useEffect(() => {
    if (theme.current === 'dark')
      document.documentElement.classList.add('dark')
  }, [])

  const routes = useMemo(() => [
    createRouteObject('/', <Index /> ),
    createRouteObject('/edit-task/:id', <EditTask /> ),
    createRouteObject('*', <Error404/> ),
  ], [])

  const [tasks, setTasks] = useState<Task[]>([]);

  // fetch tasks from a mock server
  useEffect (() => {
    let ignore = false;
    (async () => {
      try{
        if (!ignore) {
          let data = await fetch(`${SERVER_URL}/tasks`)
          data = await data.json();
          setTasks(prev => data.documents || [])
        }
      }
      catch (error: any) {
        console.error(error.message)
      }
    })();

    return () => {
      ignore = true;
    }
  }, []);

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