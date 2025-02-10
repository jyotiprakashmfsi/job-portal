import { Request, Response } from "express"
import appRouter from "./routes"

const cors = require('cors')


const express = require('express')
const app = express()
const port = 3000

app.use(cors());

app.use('/api', appRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
