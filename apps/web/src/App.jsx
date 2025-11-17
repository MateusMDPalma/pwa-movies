import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function searchMovies(event) {
    if (event) event.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch(
        `${API_URL}/api/search?q=${encodeURIComponent(query.trim())}`
      );
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* COLUNA ESQUERDA: BUSCA + RESULTADOS */}
        <div className="app-card">
          <div className="app-card-inner">
            <header className="app-header">
              <div className="app-title-wrap">
                <h1>
                  CinePWA
                  <span className="app-logo-pill">🎬</span>
                </h1>
                <p className="app-subtitle">
                  Busque filmes usando a OMDb API em um PWA com clima de noite
                  de cinema.
                </p>
              </div>

              <div className="app-badges">
                <span className="badge">
                  <span className="badge-dot" />
                  PWA + React + Node
                </span>
                <span className="badge">OMDb API</span>
              </div>
            </header>

            {/* BARRA DE BUSCA */}
            <form className="search-bar" onSubmit={searchMovies}>
              <div className="search-input-wrap">
                <span className="search-icon-left">🎟️</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Digite o nome de um filme (ex: Matrix, Barbie, Spider-Man)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className="search-hint">Enter ↵</span>
              </div>

              <button className="search-button" type="submit">
                🔍 Buscar
              </button>
            </form>

            {/* LINHA DE INFORMAÇÃO */}
            <div className="app-info">
              <span>
                {loading
                  ? "Buscando filmes..."
                  : hasSearched
                  ? `${movies.length} resultado(s) encontrado(s).`
                  : "Dica: experimente títulos em inglês para mais opções."}
              </span>
              <span>Fonte: OMDb API</span>
            </div>

            {/* LISTA DE FILMES */}
            {movies.length > 0 ? (
              <ul className="movies-list">
                {movies.map((m) => (
                  <li
                    key={m.imdbID}
                    className="movie-card"
                    onClick={() =>
                      window.open(
                        `https://www.imdb.com/title/${m.imdbID}`,
                        "_blank"
                      )
                    }
                  >
                    {m.Poster && m.Poster !== "N/A" && (
                      <img
                        src={m.Poster}
                        alt={m.Title}
                        className="movie-poster"
                      />
                    )}

                    <div className="movie-main">
                      <h2 className="movie-title">{m.Title}</h2>
                      <div className="movie-meta">
                        {m.Year}
                        {m.Type ? ` • ${m.Type.toUpperCase()}` : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                {!hasSearched ? (
                  <>
                    ✨ Bem-vindo ao CinePWA. Digite o nome de um filme acima e
                    clique em <strong>Buscar</strong> para começar a sessão.
                  </>
                ) : (
                  <>😕 Nenhum filme encontrado para essa busca. Tente outro título.</>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: PAINEL DIVERTIDO / EXPLICAÇÃO */}
        <aside className="side-panel">
          <div className="side-card">
            <h2 className="side-title">Como o CinePWA funciona?</h2>
            <p className="side-text">
              1️⃣ Você digita o título do filme. <br />
              2️⃣ O backend em Node consulta a OMDb API. <br />
              3️⃣ O PWA exibe os resultados em tempo real. <br />
              4️⃣ Clique em um card para abrir a página do filme no IMDb.
            </p>

            <div className="side-chips">
              <span className="chip">Busca em tempo real</span>
              <span className="chip">API externa</span>
              <span className="chip">Responsivo</span>
              <span className="chip">Experiência “app-like”</span>
            </div>

            <p className="side-footer">
              Ideal para demonstrar integração front + back + API em projetos
              de PWA.
            </p>
          </div>

          <div className="side-card">
            <h2 className="side-title">Dica para o professor 🎓</h2>
            <p className="side-text">
              Este demo mostra:
            </p>
            <ul className="side-text" style={{ paddingLeft: "18px", marginTop: 4 }}>
              <li>Consumo de API via backend Node/Express.</li>
              <li>Frontend em React + Vite com PWA.</li>
              <li>Organização em monorepo (apps/api + apps/web).</li>
            </ul>
            <p className="side-footer">
              O próximo passo pode ser adicionar favoritos ou histórico local
              usando storage do navegador.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

