# Usa uma imagem oficial do Node.js
FROM node:22


# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

# Instala as dependências
RUN npm install

# Compila o TypeScript (se necessário)
RUN npm run build

# Expõe a porta 3000 para acessar a API
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]

