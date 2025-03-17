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
  res.status(200).json(filmes)
})

app.get('/filmes/:id', (req, res) => {
  const { id } = req.params
  const filme = filmes.find((f: any) => f.id === id)

  if(!filme){
    res.status(404).send('Filme não encontrado!')
    return
  }
  res.json(filme)
})

app.listen(4000, () => {
  console.log(`Server runing at port ${porta}!`)
})