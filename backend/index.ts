import { Request, Response } from "express"

const express = require('express')
const app = express()
const port = 3000

const router= 

app.get('/api', (req: Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
