import { Request, Response } from "express"
import { sequelize } from "../db/model"

interface job{
    id?: number,
    title: string,
    description: string,
    location: string,
    salary: string
}

export const createJob = (req: Request, res: Response) => {
    try {
        const jobs : job = req.body()
        sequelize.query(`INSERT INTO job (title, description, location, salary) VALUES(${jobs.title} || '' , ${jobs.description} || '', ${jobs.location} || '', ${jobs.salary}) `).then((result: any)=>{
            res.status(200).json({msg: "Created!"})
        }
        )
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to create applicant"});
    }
}

export const getJobs = (req: Request, res: Response) => {
    try {
        sequelize.query(`SELECT * FROM job`).then((results: any) => {
            res.status(201).json({data: results});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}

export const getJob = (req: Request, res: Response) => {
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



export const deleteJob = (req: Request, res: Response) => {
    try {
        const id = req.body();
        sequelize.query(`DELETE FROM applicant WHERE id=${id}`).then((results: any) => {
            res.status(201).json({msg: "Deleted!"});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}



