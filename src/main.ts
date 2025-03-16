import express from 'express'
import { configDotenv } from 'dotenv'
import { filmes } from './dados/filmes.ts'
configDotenv()

const app = express()
const porta = process.env.PORTA

app.get("/", (req, res) => {
  res.end('Hello World!!')
})

app.get('/filmes', (req, res) => {
  res.json(filmes)
})

app.listen(4000, () => {
  console.log(`Server runing at port ${porta}!`)
})