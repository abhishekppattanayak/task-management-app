import { ReactNode } from "react";

export interface TaskInterface {
  _id: string,
  id: string,
  title: string,
  status: "Pending" | "Completed",
  priority: "High" | "Medium" | "Low",
  dueDate: string,
  group: string
}

export interface RouteInterface{
  path: string,
  element: ReactNode,
}