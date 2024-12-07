import { ReactNode } from "react";
import { RouteInterface, TaskInterface } from "../@types/interfaces.ts";
import { SERVER_URL } from "../config/secrets.js";

export function createRouteObject (path:string, element: ReactNode ): RouteInterface {
  return {path, element}
}

export function priorityColor (priority: string) : string {
  return priority === "High" ? "bg-red-400" : priority === "Medium" ? "bg-amber-400" : "bg-green-400"
}

export function getToday () {
  return (new Date).toLocaleDateString('en-CA')
}

function createFormData (data: object)  {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

export async function updateTask (id: string, newTask:TaskInterface) {
  try{
    let res = await fetch(`${SERVER_URL}/tasks/${id}`, {
      mode: "cors",
      method: 'POST',
      headers: {
        'Accept' : '*/*'
      },
      body: createFormData(newTask)
    })
  }
  catch {
    //
  }
}

export async function updateChecked (id: string, status: string) {
  try {
    let res = await fetch(`${SERVER_URL}/tasks/${id}`, {
      mode: "cors",
      method: 'POST',
      headers: {
        'Accept' : '*/*'
      },
      body: createFormData({status: status})
    })
  }
  catch {
    //
  }
}

export async function addNewTask (task: object) {
  try {
    let res = await fetch(`${SERVER_URL}/new`, {
      mode: "cors",
      method: "POST",
      headers: {
        'Accept' : '*/*'
      },
      body: createFormData(task)
    })
  }
  catch {
    // 
  }
}

export async function deleteTask (id: string) {
  try {
    let res = await fetch(`${SERVER_URL}/task/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        'Accept' : '*/*'
      },
    })
  }
  catch {
    //
  }
}


export function applyFilter() {

}