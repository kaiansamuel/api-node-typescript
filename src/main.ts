import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv()

const app = express()
const porta = process.env.PORTA

app.get("/", (req, res) => {
  res.end('Hello World!!')
})

app.listen(4000, () => {
  console.log(`Server runing at port ${porta}!`)
})