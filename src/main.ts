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
  const { ignorar } = req.query
  const camposParaIgnorar = ignorar ? ignorar.toString().split(',') : []

  const filme = filmes.find((f: any) => f.id === id)

  if(!filme){
    res.status(404).send('Filme não encontrado!')
    return
  }

  const copia = {...filme}
  camposParaIgnorar.forEach((campo: string) => {delete copia[campo]})

  res.json(copia)
})

app.listen(porta, () => {
  console.log(`Server runing at port ${porta}!`)
})