import { Request, Response } from "express"
import appRouter from "./src/routes/appRouter"

const express = require('express')
const app = express()
const port = 3000

const router= 

app.get('/api', appRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
