# 🍎 Descrição do projeto API Daily Diet:

API desenvolvida em Node.JS para controle de dieta.

## 🛠️ Tecnologias utilizadas:

* Node.js
* Fastify
* Typescript
* Zod
* Fastify Cookie
* Knex
* Postgres
* Vitest
* Supertest
* Docker

### ✏️ RF (Requisitos funcionaiss)

- [x] O usuário deve poder inserir uma nova refeição, informando nome, descrição e se está dentro ou não da dieta;
- [x] O usuário deve pode editar uma refeição, podendo alterar os dados acima;
- [x] O usuário deve poder apagar uma refeição;
- [x] O usuário deve poder visualizar todas as refeições dele;
- [x] O usuário deve poder visualizar uma única refeição dele;
- [x] O usuário deve poder recuperar as métricas de quantidade total de refeições registradas, quantidade total dentro da dieta, quantidade total fora da dieta;

### 💼 RN (Regras de negócio)

- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuario só pode visualizar refeições o qual ele criou;
- [x] O usuario só pode editar refeições o qual ele criou;
- [x] O usuario só pode apagar refeições o qual ele criou;
- [x] A refeição deverá conter data/hora ao inserir no banco de dados;

### 🚀 Para executar

- yarn dev / npm run dev
- docker compose up

<p align="center">Desenvolvido por Alex Bruno</p>