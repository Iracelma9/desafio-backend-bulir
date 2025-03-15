<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">API de Reservas de Serviços</h1>

<p align="center">
  Backend desenvolvido com <strong>NestJS, Prisma e MySQL</strong> para uma plataforma de reservas.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

---

## Tecnologias Utilizadas

- **NestJS** - Framework para Node.js
- **Prisma ORM** - Gerenciamento do banco de dados
- **JWT** - Autenticação segura
- **Docker** - Para rodar a aplicação em qualquer ambiente
- **Swagger** - Documentação automática da API

---

## 🔧 Como Rodar o Projeto

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/desafio-backend-bulir.git
cd desafio-backend-bulir


```bash
$ npm install
```

## Compile and run the project

```bash
Configurar o banco de dados
Crie um arquivo .env na raiz do projeto e adicione as variáveis:
DATABASE_URL="mysql://user:password@localhost:3306/bulir_db"
JWT_SECRET="sua_chave_secreta"


Executar as migrations do Prisma
npx prisma migrate dev --name init

## Rodar o servidor
npm run start:dev
A API estará disponível em http://localhost:3000.

 Documentação com Swagger
Para visualizar a documentação interativa da API, acesse:
http://localhost:3000/api
Todos os endpoints podem ser testados diretamente no navegador!

Endpoints Principais

##Autenticação
POST /auth/login - Faz login e retorna um token JWT

##Usuários
POST /users/register - Cadastro de usuário
PATCH /users/deposit - Cliente adiciona saldo
GET /users - Listar usuários

##Serviços
POST /services - Criar serviço (apenas PROVIDERS)
PATCH /services/:id - Atualizar serviço (apenas PROVIDERS)
GET /services - Listar serviços

## Reservas
POST /reservations - Reservar um serviço (apenas CLIENTS)
DELETE /reservations/:id - Cancelar uma reserva (apenas CLIENTS)

Rodando com Docker
Se quiser rodar a API dentro de um container Docker:
docker build -t meu-app .
docker run -p 3000:3000 meu-app

Isso garantirá que a API funcione em qualquer ambiente sem precisar instalar dependências manualmente.

Sobre o Projeto
Este projeto foi desenvolvido como parte do desafio técnico para a vaga de desenvolvedor Bulir.

Caso tenha dúvidas ou sugestões, entre em contato!
 Desenvolvido por Iracelam Panzo - 2025
