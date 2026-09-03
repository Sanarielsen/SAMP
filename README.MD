# SIAMPI

<p align="center">
  <img src="./frontend/public/samp_logo.svg" alt="Logo SIAMPI" width="220" />
</p>

Sistema de importação e automatização de marcas e propriedades industriais.

**Desenvolvido por:** Samuel Henrique Aka Sanarielsen para Naniele Marques

## Sobre o projeto

O Projeto SAMP foi desenvolvido para que o software SIAMPI fosse uma solução para organização e gestão de processos relacionados à propriedade industrial, com foco em marca e registros no INPI. O sistema permite o cadastro e acompanhamento de clientes, representantes, processos importados e publicações, além de oferecer controle de usuários por perfil e acesso.

A plataforma centraliza as etapas do fluxo de trabalho, reduzindo a necessidade de organização manual e facilitando o acompanhamento dos dados envolvidos em cada solicitação.

## Logo

A logo oficial do projeto é a versão laranja, que representa a identidade visual principal do sistema. Também existe uma versão branca para uso em fundos escuros.

<p align="center">
  <img src="./frontend/public/samp_logo.svg" alt="Logo SIAMPI laranja" width="180" />
  <img src="./frontend/public/samp_logo_white.svg" alt="Logo SIAMPI branca" width="180" />
</p>

## Stack tecnológica

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
</p>

## Funcionalidades principais

- Cadastro e organização de clientes e representantes
- Controle de usuários por papel e permissões
- Importação de processos do INPI
- Armazenamento e consulta de dados industriais
- Registro e acompanhamento de publicações e processos
- Gestões de fluxo com organização por etapas
- Integração com banco PostgreSQL via Prisma
- Estrutura preparada para desenvolvimento em ambiente local e produção

## Estrutura do projeto

```text
SAMP/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── shared/
├── README.MD
└── assets/
```

## Requisitos

- Node.js 20+
- PostgreSQL
- Docker (opcional, para subir o banco local)

## Documentação e design

Para acompanhar a documentação do projeto e visualizar o protótipo de interface, utilize os links abaixo:

- Documentação (Notion): [Acesse a documentação](https://app.notion.com/p/SAMP-Documenta-o-3c75cfc3d9708021b5b6f755716393d4?source=copy_link)
- Protótipo no Figma: [Acesse o protótipo](https://www.figma.com/design/fLMG6X4xLqsvQaJBqw3Xli/Freela---SAMP-Design?node-id=0-1&p=f)

<p align="center">
  <a href="https://app.notion.com/p/SAMP-Documenta-o-3c75cfc3d9708021b5b6f755716393d4?source=copy_link">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion" />
  </a>
  <a href="https://www.figma.com/design/fLMG6X4xLqsvQaJBqw3Xli/Freela---SAMP-Design?node-id=0-1&p=f">
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
  </a>
</p>

## Observações

- A versão principal da logo é a laranja (`samp_logo.svg`).
- A versão branca (`samp_logo_white.svg`) foi pensada para uso em fundos escuros.
- O projeto utiliza Prisma com PostgreSQL e Fastify no backend, com React + Vite no frontend.

## Licença

Este projeto foi desenvolvido para uso interno e acadêmico/organizacional conforme a necessidade da operação ou desenvolvedor.

