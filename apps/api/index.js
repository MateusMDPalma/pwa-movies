const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001
const OMDB_API_KEY = process.env.OMDB_API_KEY

app.use(cors())
app.use(express.json())

// Rota de healthcheck (pra testar se a API está ok)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API de filmes rodando 🚀' })
})

// Rota de busca de filmes
app.get('/api/movies', async (req, res) => {
  const search = req.query.search

  if (!search) {
    return res.status(400).json({ error: 'Parâmetro "search" é obrigatório' })
  }

  if (!OMDB_API_KEY) {
    return res.status(500).json({ error: 'OMDB_API_KEY não configurada' })
  }

  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
      search
    )}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error || 'Nenhum filme encontrado' })
    }

    // devolve só a lista de filmes
    return res.json({
      search,
      total: data.Search?.length || 0,
      movies: data.Search,
    })
  } catch (err) {
    console.error('Erro ao buscar filmes na OMDb:', err)
    return res.status(500).json({ error: 'Erro interno ao buscar filmes' })
  }
})

// Sobe o servidor
app.listen(PORT, () => {
  console.log(`API de filmes ouvindo em http://localhost:${PORT}`)
})
