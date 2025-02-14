import { Router } from "express";
import { createJob, deleteJob, getJob, getJobs } from "../controller/jobManager";
const jobRoute= Router()


jobRoute.post("/", createJob)
jobRoute.get("/", getJobs)
jobRoute.get("/:id", getJob)
jobRoute.delete("/", deleteJob)

export default jobRoute;