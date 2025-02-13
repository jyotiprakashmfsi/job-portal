import { Router } from "express";
import { createApplicant, getApplicants, getApplicantsByJob, deleteApplicant } from "../helper/applicantManager";
const applicantRoute = Router();

applicantRoute.post("/", createApplicant);
applicantRoute.get("/", getApplicants);
applicantRoute.get("/job/:jobId", getApplicantsByJob);
applicantRoute.delete("/:id", deleteApplicant);

export default applicantRoute;