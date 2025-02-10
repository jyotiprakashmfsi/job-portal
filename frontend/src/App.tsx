import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface jobs{
    id?: number,
    title: string,
    description: string,
    location: string,
    salary: string

}

function App() {
  const [jobs, setJobs]= useState<jobs>()
  useEffect

  return (
    <>
     <h1>Welcome to Job Portal</h1>

    </>
  )
}

export default App
