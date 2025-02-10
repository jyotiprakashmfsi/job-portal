import { Router } from "express";
import { createApplicant, getApplicants, getApplicant, deleteApplicant } from "../helper/applicantManager";
const applicantRoute= Router()

applicantRoute.post("/", createApplicant)
applicantRoute.get("/", getApplicants)
applicantRoute.get("/:id", getApplicant)
applicantRoute.delete("/", deleteApplicant)

export default applicantRoute;