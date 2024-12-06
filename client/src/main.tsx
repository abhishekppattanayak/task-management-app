import './index.css'
// @deno-types="@types/react"
import { StrictMode } from 'react'
// @deno-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SERVER_URL } from "./config/secrets.js"
import mock from "./assets/mock.json" with {type: "json"};

const fetchInitialTasks = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/tasks`);
    const data = await response.json();
    return data.documents || [];
  } catch (error:any) {
    console.error(error.message);
    return mock.documents;
  }
};

const tasks = await fetchInitialTasks();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App prefetchTasks={tasks} />
  </StrictMode>,
)
