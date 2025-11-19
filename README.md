# PWA Movies 🎬

Aplicação **PWA** para busca de filmes usando a API pública **OMDb**, com **frontend em React (Vite)**, **API em Node/Express** e ambiente completo rodando em **Docker Compose** + **CI com GitHub Actions** e testes E2E com **Playwright**.

---

## 🧩 Visão geral

Este projeto é a evolução de uma extensão de Chrome para um **Progressive Web App (PWA)** completo, atendendo aos requisitos:

- PWA instalável (manifest + service worker + ícones);
- Integração com backend próprio (Node/Express) que consome a OMDb API;
- Execução com **Docker Compose** (web + api);
- Testes automatizados (Playwright E2E);
- Pipeline de **CI no GitHub Actions** (build + testes);
- Deploy do PWA no **GitHub Pages**.

---

## 🛠 Stack

- **Frontend:** React + Vite (`apps/web`)
- **Backend:** Node.js + Express (`apps/api`)
- **PWA:**
  - `manifest.webmanifest`
  - `service-worker.js` com cache básico da shell do app
- **Infra:** Docker + Docker Compose
- **Tests E2E:** Playwright (`tests/`)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 📂 Estrutura do projeto

```text
pwa-movies/
├─ apps/
│  ├─ api/          # Backend Node/Express (movies-api)
│  └─ web/          # Frontend React + Vite (cinepwa-web, PWA)
├─ tests/           # Testes E2E com Playwright
├─ docker-compose.yml
├─ playwright.config.js
├─ .github/
│   └─ workflows/
│       └─ ci.yml   # Pipeline de CI (build + testes E2E)
└─ README.md
```

---

## 🚀 Como rodar localmente com Docker

Pré-requisitos:
- **Docker Desktop** instalado e rodando.

Na raiz do projeto:

```bash
docker compose up --build
```

Isso vai subir:

- **API** em: `http://localhost:3001`
- **PWA (web)** em: `http://localhost:8080`

Para derrubar os containers:

```bash
docker compose down
```

---

## 👩‍💻 Como rodar localmente sem Docker (opcional)

### 1) Backend (API – Node/Express)

```bash
cd apps/api
npm install
npm run dev        # ou npm start, dependendo da config
```

A API sobe em `http://localhost:3001`.

Certifique-se de ter um arquivo `.env` em `apps/api` com, por exemplo:

```env
PORT=3001
OMDB_API_KEY=SUA_CHAVE_OMDB_AQUI
```

---

### 2) Frontend (Web – React/Vite)

```bash
cd apps/web
npm install
npm run dev
```

O frontend abre em `http://localhost:5173`.

---

## 📱 PWA: instalação e uso offline

### Manifest & Service Worker

O projeto inclui:

- `apps/web/public/manifest.webmanifest`
- `apps/web/public/service-worker.js`

O **service worker** faz cache da shell principal do app (HTML/CSS/JS), permitindo:

- Abrir o PWA mesmo após perder a conexão (shell offline);
- Os dados de filmes (buscas) ainda dependem da API/Internet.

### Instalar o PWA (desktop)

Com o app rodando (ex.: `http://localhost:8080` via Docker):

1. Abra no **Chrome**.
2. Procure o ícone de instalação na barra de endereços ou vá em:
   - `⋮` → **Instalar PWA Movies / Instalar aplicativo**.
3. Confirme.  
   O app abre em uma janela própria e pode ser fixado no Dock / Launchpad.

### Instalar o PWA (mobile – produção)

Em ambiente HTTPS (ex.: GitHub Pages):

- **Android (Chrome):**
  - Abra a URL do PWA;
  - Toque em “Adicionar à tela inicial” / “Instalar app”.
- **iOS (Safari):**
  - Abra a URL do PWA;
  - Toque em compartilhar → **“Adicionar à Tela de Início”**.

---

## 🧪 Testes E2E com Playwright

Os testes E2E ficam em `tests/` e usam `playwright.config.js` na raiz.

Para rodar os testes (com servidor web acessível):

```bash
npm run test:e2e
```

O teste principal valida que:

1. O PWA carrega a página inicial;
2. O usuário consegue buscar por um filme (ex.: “Batman”);
3. Cards de filmes são renderizados na interface (`data-testid="movie-card"`).

---

## ⚙️ CI com GitHub Actions

O workflow em `.github/workflows/ci.yml` executa:

1. Checkout do código;
2. Setup de Node 20;
3. `npm ci` (instalação das dependências do monorepo);
4. Build da aplicação web (`npm run build:web`);
5. Subida da API + Web em modo dev;
6. Instalação dos browsers do Playwright;
7. Execução dos testes E2E (`npm run test:e2e`);
8. Upload do relatório de testes E2E como artefato.

Isso garante que a aplicação builda e passa nos testes a cada `push` ou `pull_request` na branch principal.

---

## 🔐 Variáveis de ambiente

As variáveis sensíveis **não são versionadas**.  
Arquivos `.env` esperados:

- `apps/api/.env`:
  - `PORT=3001`
  - `OMDB_API_KEY=SUA_CHAVE_OMDB_AQUI`

- `apps/web/.env` (opcional, se usar variável de API URL no frontend):
  - `VITE_API_URL=http://localhost:3001`

---

## ✅ Checklist dos requisitos do projeto

- [x] PWA instalável (manifest + service worker + ícones);
- [x] Integração com backend próprio (Node/Express);
- [x] Consumo de API externa (OMDb);
- [x] Execução com Docker Compose (web + api);
- [x] Testes E2E com Playwright;
- [x] CI no GitHub Actions (build + testes);
- [x] PWA publicado (ex.: GitHub Pages) com documentação no README.
