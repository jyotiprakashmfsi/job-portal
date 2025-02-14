import { Router } from "express";
import { createApplicant, getApplicants, getApplicantsByJob, deleteApplicant } from "../controller/applicantManager";
const applicantRoute = Router();


/**
* @swagger
* /api/applicants:
*   POST:
*     tags:
*       - Protected Routes
*     summary: Test protected route
*     parameters:
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*             example:
*               message: "Protected route accessed"
*               user: { "user_id": 1, "email": "user@example.com" }
*               authMethod: "header"
*       401:
*         description: Unauthorized - No token provided or invalid token
*     description: |
*       Protected route that requires valid JWT token. Token can be provided in either:
*       1. Authorization header (Bearer token)
*       2. X-Stored-Token header (raw token)
*   GET:
*     tags:
*       - Protected Routes
*     summary: Test protected route
*     parameters:
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*             example:
*               message: "Protected route accessed"
*               user: { "user_id": 1, "email": "user@example.com" }
*               authMethod: "header"
*       401:
*         description: Unauthorized - No token provided or invalid token
*     description: |
*       Protected route that requires valid JWT token. Token can be provided in either:
*       1. Authorization header (Bearer token)
*       2. X-Stored-Token header (raw token)
* /api/job/{jobid}:
*   POST:
*     tags:
*       - Protected Routes
*     summary: Test protected route
*     parameters:
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*             example:
*               message: "Protected route accessed"
*               user: { "user_id": 1, "email": "user@example.com" }
*               authMethod: "header"
*       401:
*         description: Unauthorized - No token provided or invalid token
*     description: |
*       Protected route that requires valid JWT token. Token can be provided in either:
*       1. Authorization header (Bearer token)
*       2. X-Stored-Token header (raw token)
*   GET:
*     tags:
*       - Protected Routes
*     summary: Test protected route
*     parameters:
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*             example:
*               message: "Protected route accessed"
*               user: { "user_id": 1, "email": "user@example.com" }
*               authMethod: "header"
*       401:
*         description: Unauthorized - No token provided or invalid token
*     description: |
*       Protected route that requires valid JWT token. Token can be provided in either:
*       1. Authorization header (Bearer token)
*       2. X-Stored-Token header (raw token)
*/

applicantRoute.post("/", createApplicant);
applicantRoute.get("/", getApplicants);
applicantRoute.get("/job/:jobId", getApplicantsByJob);
applicantRoute.delete("/:id", deleteApplicant);

export default applicantRoute;