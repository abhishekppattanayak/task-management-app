import { ReactNode } from "react";
import { RouteInterface } from "../@types/interfaces.ts";

export function createRouteObject (path:string, element: ReactNode ): RouteInterface {
  return {path, element}
}

export function toggleTheme () : void {
  localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
  document.documentElement.classList.toggle('dark');
}