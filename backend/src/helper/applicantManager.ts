import { Request, Response } from "express"
import { sequelize } from "../db/model"

interface applicant{
    id?: number,
    name: string,
    email: string,
    resume: string,
    job_id: number
}

export const createApplicant = async (req: Request, res: Response) => {
    try {
        const appl : applicant = req.body()
        sequelize.query(`INSERT INTO applicant (applicant_name, email, resume, job_id) VALUES(${appl.name} || '' , ${appl.email} || '', ${appl.resume} || '', ${appl.job_id}) `).then((result: any)=>{
            res.status(200).json({msg: "Created!"})
        }
        )
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to create applicant"});
    }
}

export const getApplicants = async (req: Request, res: Response) => {
    try {
        sequelize.query(`SELECT * FROM applicant`).then((results: any) => {
            res.status(201).json({data: results});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}

export const getApplicant = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        sequelize.query(`SELECT * FROM applicant WHERE id=${id}`).then((results: any) => {
            res.status(201).json({data: results});
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({msg: "Failed to get applicants"});
    }
}



export const deleteApplicant = async (req: Request, res: Response) => {
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



