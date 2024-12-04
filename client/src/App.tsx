import { BrowserRouter, Routes, Route } from "npm:react-router-dom";
import { ReactNode, createContext, useCallback, useMemo, useEffect, useRef } from "react";
import EditTask from "./pages/edit.tsx";
import Index from "./pages/index.tsx";

export const ThemeContext = createContext<null>(null);
export type Theme = 'light' | 'dark';

interface RouteInterface{
  path: string,
  element: ReactNode,
}

export default function App () {

  const theme = useRef<Theme>( localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' );
  useEffect(() => {
    if (theme.current === 'dark')
      document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = useCallback(() => {
    localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  }, []);

  const createRouteObject = useCallback((path: string, element: ReactNode) => {
    return {path, element}
  }, []);

  const routes = useMemo(() => [
    createRouteObject('/', <Index /> ),
    createRouteObject('/edit-task/:id', <EditTask /> )
  ], [])

  return (
    <ThemeContext.Provider value={toggleTheme} >
      <BrowserRouter>
          <button onClick={toggleTheme} >Change Theme</button>
        <Routes>
          {routes.map((route:RouteInterface, key:number) => <Route key={key} path={route.path} element={route.element} /> )}
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}