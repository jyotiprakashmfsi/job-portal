import { Router } from "express";
import applicantRoute from "./applicantRoute";
import jobRoute from "./jobRouter";
const appRouter = Router()

appRouter.use('/applicants', applicantRoute)
appRouter.use('/jobs', jobRoute)

export default appRouter