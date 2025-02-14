import { Request, Response } from "express"
import { sequelize } from "../db/model"

interface applicant {
    id?: number,
    name: string,
    email: string,
    resume: string,
    job_id: number
}

export const createApplicant = async (req: Request, res: Response) => {
    try {
        const appl: applicant = req.body;
        console.log("Creating applicant:", appl);
        
        const query = `
            INSERT INTO applicant (applicant_name, email, resume, job_id) 
            VALUES ($1, $2, $3, $4)
        `;
        
        await sequelize.query(query, {
            bind: [appl.name, appl.email, appl.resume, appl.job_id]
        });
        
        res.status(201).json({ msg: "Application submitted successfully!" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Failed to submit application" });
    }
}

export const getApplicants = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT a.*, j.title as job_title 
            FROM applicant a 
            JOIN job j ON a.job_id = j.job_id
        `;
        const results = await sequelize.query(query);
        res.status(200).json({ data: results[0] });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Failed to get applicants" });
    }
}

export const getApplicantsByJob = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.jobId;
        const query = `
            SELECT a.*, j.title as job_title 
            FROM applicant a 
            JOIN job j ON a.job_id = j.job_id 
            WHERE a.job_id = $1
        `;
        const results = await sequelize.query(query, {
            bind: [jobId]
        });
        res.status(200).json({ data: results[0] });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Failed to get applicants" });
    }
}

export const deleteApplicant = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await sequelize.query('DELETE FROM applicant WHERE id = $1', {
            bind: [id]
        });
        res.status(200).json({ msg: "Applicant deleted successfully" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Failed to delete applicant" });
    }
}
