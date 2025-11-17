# 🎬 CinePWA – Catálogo de Filmes (PWA + API)

## 1. Visão geral do projeto

O **CinePWA** é uma aplicação web no formato **PWA (Progressive Web App)** desenvolvida para a disciplina **Data Applied to Business**.  
O projeto tem como objetivo integrar:

- Consumo de dados de uma **API externa de filmes (OMDb API)**;
- Um **backend em Node.js/Express** para intermediar o acesso à API;
- Um **frontend PWA** responsivo, que pode ser instalado em dispositivos móveis ou desktop.

A aplicação permite que o usuário:

- Pesquise filmes pelo título;
- Visualize uma lista de resultados com informações básicas;
- Acesse uma tela de detalhes com pôster, sinopse, elenco e nota no IMDb.

---

### 1.1 Motivação

O projeto foi pensado para simular um **produto digital orientado a dados**, aproximando os conteúdos da disciplina de um cenário prático, em que:

- Dados externos são consumidos via API;
- Há separação clara entre **camada de apresentação** (frontend) e **camada de integração** (backend);
- O usuário final recebe uma experiência moderna, semelhante à de um aplicativo nativo.

---

### 1.2 Tecnologias principais

- **Frontend:** PWA (ex.: React + Vite), HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express
- **Integração externa:** OMDb API (dados de filmes)
- **Outros:** Dotenv (variáveis de ambiente), Git/GitHub

---

## 2. Arquitetura e Fluxo de Dados

A arquitetura do **CinePWA** é organizada em **duas camadas principais**, estruturadas em um **monorepo** com separação entre `frontend/` e `backend/`.

---

### 2.1 Camadas da aplicação

1. **Frontend (PWA)**  
   - Responsável pela **interface com o usuário**.  
   - Exibe campo de busca, lista de filmes e página de detalhes.  
   - Realiza chamadas HTTP para o backend (ex.: `GET /api/movies?search=Batman`).  

2. **Backend (API Node/Express)**  
   - Atua como intermediário entre o frontend e a **OMDb API**.  
   - Recebe as requisições do frontend, consulta a OMDb e devolve os dados tratados.  
   - Protege a **chave de API** usando variáveis de ambiente (`.env`).

---

### 2.2 Estrutura em monorepo

A organização do repositório segue a seguinte estrutura geral:

```bash
.
├── backend/        # API Node/Express (integração com OMDb)
│   ├── src/
│   └── package.json
├── frontend/       # Aplicação PWA (interface do usuário)
│   ├── src/
│   └── package.json
└── README.md
```

Essa separação facilita o desenvolvimento, permitindo que frontend e backend evoluam de forma independente, mantendo tudo em um único projeto.

---

### 2.3 Fluxo de requisições

O fluxo básico de dados funciona assim:

```text
Usuário → Frontend (PWA) → Backend (Node/Express) → OMDb API
                                          ↓
                               Resposta tratada → Frontend → Tela do usuário
```

1. O usuário digita o nome de um filme na interface.  
2. O frontend envia uma requisição para o backend com o termo de busca.  
3. O backend consulta a **OMDb API** usando a `OMDB_API_KEY`.  
4. Os dados retornados são filtrados/organizados e enviados de volta ao frontend.  
5. O frontend exibe os resultados e os detalhes do filme para o usuário.

---

## 3. Configuração e Execução do Projeto

Esta seção explica como preparar o ambiente e rodar o **CinePWA** localmente.

---

### 3.1 Pré-requisitos

- [Node.js](https://nodejs.org/) **18+**
- `npm` (instalado junto com o Node.js)
- Chave da **[OMDb API](https://www.omdbapi.com/)**

---

### 3.2 Clonar ou extrair o projeto

Se estiver usando Git:

```bash
git clone https://github.com/MateusMDPalma/pwa-movies.git
cd pwa-movies
```

Se recebeu um `.zip`:

1. Extraia o `.zip`.
2. Abra o terminal na pasta raiz do projeto.

A estrutura esperada:

```bash
.
├── backend/
├── frontend/
└── README.md
```

---

### 3.3 Configuração do backend

No diretório `backend/`:

```bash
cd backend
npm install
```

Crie um arquivo `.env` com:

```env
OMDB_API_KEY=SUA_CHAVE_AQUI
PORT=3001
```

Inicie o servidor:

```bash
npm run dev
# ou
npm start
```

O backend ficará acessível em:

```text
http://localhost:3001
```

---

### 3.4 Configuração do frontend

Em outro terminal, no diretório `frontend/`:

```bash
cd frontend
npm install
```

Se o frontend usa variável de ambiente para a API, crie um `.env` com algo como:

```env
VITE_API_BASE_URL=http://localhost:3001
# ou REACT_APP_API_BASE_URL=http://localhost:3001
```

Inicie o frontend:

```bash
npm run dev
```

O app ficará disponível em:

```text
http://localhost:5173
```

Com **frontend** e **backend** rodando, a aplicação já pode ser utilizada para pesquisar e visualizar filmes.

---

## 4. Funcionalidades e Possíveis Extensões

---

### 4.1 Funcionalidades atuais

O **CinePWA** entrega as seguintes funcionalidades principais:

- 🔍 **Busca de filmes por título**  
  - Campo de pesquisa onde o usuário digita o nome do filme.
  - Envio da busca ao backend, que consulta a OMDb API.

- 📋 **Lista de resultados**  
  - Exibição dos filmes encontrados com:
    - Título
    - Ano
    - Pôster (quando disponível)

- 📄 **Tela de detalhes do filme**  
  - Ao selecionar um filme, o usuário visualiza:
    - Pôster em destaque  
    - Sinopse (Plot)  
    - Elenco (Actors)  
    - Nota no IMDb (imdbRating), quando fornecida pela API  

- 📱 **Interface responsiva (PWA)**  
  - Layout adaptado para diferentes tamanhos de tela (desktop, tablet, mobile).
  - Experiência semelhante a um aplicativo instalado.

---

### 4.2 Recursos PWA

O frontend foi configurado como **Progressive Web App**, oferecendo:

- `manifest.json` com:
  - Nome e ícone do app;
  - Cores de tema e background;
  - Configurações para instalação como app.

- `service worker` (conforme implementação do projeto):
  - Cache básico de arquivos estáticos;
  - Melhoria de desempenho em conexões instáveis.

Na prática, o usuário pode:

- Acessar o app via navegador;
- Instalar o app na tela inicial (mobile/desktop);
- Ter uma experiência mais fluida e contínua.

---

### 4.3 Possíveis melhorias futuras

Algumas extensões que podem evoluir o projeto:

- ⭐ **Favoritos**  
  - Permitir que o usuário salve filmes preferidos (armazenamento local).

- 🧾 **Histórico de buscas**  
  - Registrar últimos termos pesquisados para acesso rápido.

- 🌓 **Tema claro/escuro**  
  - Alternância entre temas para melhorar a experiência visual.

- 📊 **Métricas e análise de uso**  
  - Coleta de dados de buscas e acessos para análises em contexto de *Data Applied to Business*.

- 🎯 **Recomendações simples**  
  - Sugestão de filmes relacionados com base nas buscas anteriores.

---

Este README resume a visão geral, arquitetura, configuração e funcionalidades do **CinePWA**, conectando o desenvolvimento técnico à proposta da disciplina **Data Applied to Business**.
