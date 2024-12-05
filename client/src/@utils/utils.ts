import { ReactNode } from "react";
import { RouteInterface } from "../@types/interfaces.ts";

export function createRouteObject (path:string, element: ReactNode ): RouteInterface {
  return {path, element}
}

export function toggleTheme () : void {
  localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
  document.documentElement.classList.toggle('dark');
}

export function priorityColor (priority: string) : string {
  return priority === "High" ? "bg-red-400" : priority === "Medium" ? "bg-amber-400" : "bg-green-400"
}