import { Request, Response } from "express"
import { sequelize } from "../db/model"

interface job{
    id?: number,
    title: string,
    description: string,
    location: string,
    salary: string
}

export const createJob = async (req: Request, res: Response) => {
    try {
        const jobs: job = req.body;
        console.log("Creating job:", jobs);
        
        const query = `
            INSERT INTO job (title, description, location, salary) 
            VALUES ($1, $2, $3, $4)
        `;
        
        await sequelize.query(query, {
            bind: [jobs.title, jobs.description, jobs.location, jobs.salary]
        });
        
        res.status(201).json({ msg: "Job created successfully!" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Failed to create job" });
    }
}

export const getJobs = async (req: Request, res: Response) => {
    try {
        sequelize.query(`SELECT * FROM job`).then((results: any) => {
            res.status(201).json({data: results});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}

export const getJob = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        sequelize.query(`SELECT * FROM job WHERE id=${id}`).then((results: any) => {
            res.status(201).json({data: results});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}



export const deleteJob = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        sequelize.query(`DELETE FROM applicant WHERE id=${id}`).then((results: any) => {
            res.status(201).json({msg: "Deleted!"});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}
