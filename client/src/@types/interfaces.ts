import { ReactNode } from "react";

export interface Task {
  id: string,
  title: string,
  status: "Pending" | "Completed",
  priority: "High" | "Medium" | "Low",
  dueDate: string
}

export interface RouteInterface{
  path: string,
  element: ReactNode,
}