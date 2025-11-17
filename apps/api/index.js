require('dotenv').config();
const express = require('express');
const cors = require('cors');

// gambiarra pra usar node-fetch v3 com require()
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

const PORT = process.env.PORT || 3001;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(cors());

// rota de teste
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API de filmes está rodando 🚀' });
});

// buscar filmes por título (lista)
app.get('/api/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q (título) é obrigatório.' });
  }

  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
      q
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar filmes na OMDb:', err);
    res.status(500).json({ error: 'Erro ao consultar OMDb.' });
  }
});

// detalhes de um filme por ID (IMDb ID)
app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar detalhes do filme:', err);
    res.status(500).json({ error: 'Erro ao consultar detalhes do filme.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API ouvindo em http://localhost:${PORT}`);
});

