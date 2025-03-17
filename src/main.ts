import express from 'express'
import { configDotenv } from 'dotenv'
import { filmes } from './dados/filmes.ts'
import type { Filme } from './model/index.ts'
configDotenv()

const app = express()
const porta = process.env.PORTA

function limparCampos(filme: Filme, ignorar: string | undefined) {
  const camposParaIgnorar = ignorar ? ignorar.toString().split(',') : []
  const copia: Partial<Filme> = {...filme}
  camposParaIgnorar.forEach((campo: string) => {delete copia[campo as keyof Filme]})
  return copia
}

app.get("/", (req, res) => {
  res.end('Hello World!!')
})

app.get('/filmes', (req, res) => {
  const { ignorar } = req.query as any
  const filmesProcessados = filmes.map((filme: any) => {
    return limparCampos(filme, ignorar)
  })
  res.status(200).json(filmesProcessados)
})

app.get('/filmes/:id', (req, res) => {
  const { id } = req.params
  const { ignorar } = req.query as any
  

  const filme = filmes.find((f: any) => f.id === id)

  if(!filme){
    res.status(404).send('Filme não encontrado!')
    return
  }

  

  res.json(limparCampos(filme, ignorar))
})

app.listen(porta, () => {
  console.log(`Server runing at port ${porta}!`)
})