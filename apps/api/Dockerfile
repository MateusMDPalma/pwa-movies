FROM node:20-alpine

WORKDIR /app

# Copia apenas arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências de produção (sem devDependencies)
RUN npm install --omit=dev

# Agora copia o restante do código da API
COPY . .

# Expõe a porta da API
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "index.js"]
