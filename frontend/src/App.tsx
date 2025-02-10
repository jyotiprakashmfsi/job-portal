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
  useEffect(() => {
    const fetchJobs = async()=>{
      try {
        const data= await fetch('http://localhost:3000/api/jobs')
        const res= await data.json();
        console.log(res);
        setJobs(res[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobs();
  }, [])
  

  return (
    <>
     <h1>Welcome to Job Portal</h1>
     {/* {jobs.forEach(job => {
      {job.title}
      {job.description}
      {job.location}
      {job.salary}
     });} */}

    </>
  )
}

export default App
