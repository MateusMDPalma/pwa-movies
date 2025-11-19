import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function App() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    setError('')
    setMovies([])

    if (!search.trim()) {
      setError('Digite o nome de um filme para buscar.')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        `${API_URL}/api/movies?search=${encodeURIComponent(search.trim())}`
      )

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Erro ao buscar filmes')
      }

      const data = await res.json()
      setMovies(data.movies || [])
    } catch (err) {
      console.error(err)
      setError(err.message || 'Erro inesperado ao buscar filmes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#f9fafb',
        background: 'radial-gradient(circle at top, #1e293b, #020617)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          PWA Movies 🎬
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          Busque filmes usando a API OMDb via nossa API Node/Express.
        </p>
      </header>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do filme (ex: Batman)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.5)',
            outline: 'none',
            backgroundColor: 'rgba(15,23,42,0.8)',
            color: '#e5e7eb',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: 'none',
            background:
              'linear-gradient(135deg, #6366f1, #ec4899)',
            color: '#f9fafb',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Buscar
        </button>
      </form>

      {loading && (
        <p style={{ marginBottom: '16px' }}>Carregando filmes...</p>
      )}

      {error && (
        <p
          style={{
            marginBottom: '16px',
            color: '#f97373',
          }}
        >
          {error}
        </p>
      )}

      {/* data-testid para os testes E2E */}
      <section
        data-testid="api-ok"
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
        }}
      >
        {movies.map((movie) => (
          <article
            key={movie.imdbID}
            style={{
              backgroundColor: 'rgba(15,23,42,0.9)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(148,163,184,0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'repeating-linear-gradient(45deg, #0f172a, #0f172a 10px, #020617 10px, #020617 20px)',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                }}
              >
                Sem imagem
              </div>
            )}
            <div style={{ padding: '10px 12px' }}>
              <h2
                style={{
                  fontSize: '0.95rem',
                  marginBottom: '4px',
                  fontWeight: 600,
                }}
              >
                {movie.Title}
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  opacity: 0.8,
                }}
              >
                {movie.Year} • {movie.Type}
              </p>
            </div>
          </article>
        ))}
      </section>

      {!loading && !error && movies.length === 0 && (
        <p style={{ marginTop: '8px', opacity: 0.8 }}>
          Comece buscando por um filme 👆
        </p>
      )}
    </div>
  )
}
