# SAMP

- Sistema automatizado de marcas e patentes

### Problema
O software antigo que era utilizado está muito caro e desatualizado. A ideia é construir um novo para se adequar melhor as necessidades do negócio atualmente.

### Entidades

Durante as conversas com a cliente, foram identificados as seguintes entidades:

- Usuários
- Clientes
- Representantes
- Ordens de servicos (O.S)
- Pagamentos
- Processos

Dentre elas, suas relacoes sáo da seguinte maneira:

![Diagrama de relacionamento](./assets/MER.png)

O foco principal do desenvolvimento será o FRONT-END de primeiro passo, já que o design já está finalizado. Para isso, o primeiro passo será construir todo o sistema de autenticacão e login

Etapas a serem desenvolvidas:
  - Sistema de login e controle de autorizacões;
  - Visualizacão e gerenciamento dos clientes;
  - Visualizacão e gerenciamento dos representantes;
  - Visualizacão e gerenciamento das ordens de servico;
  - Visualizacão e gerenciamento dos processos;

## Representantes

### Dados da Entidade

Todo cliente possui seu representante, dentre ele, temos as seguintes propriedades a serem considerados:
- name          string
- nacionality   string
- documentRG    string
- documentCPF   string
- titleJob      string
- roleJob       string

As informacões adicionais desse objeto, serão:
- id (GET, PATCH)
- createdAt (POST)
- updatedAt (PATCH)

### Mapeamento das rotas

> Listagem de todos os representantes de um cliente;
##### Route
- GET /client/:id/representatives?search=
##### Response
- [name, nacionality, documentRG, documentCPF, titleJob, roleJob]
<br>

> Listagem de um representante correspondente deste cliente;
##### Route
- GET /client/:id/representative/:idRepresentative
##### Response
- {name, nacionality, documentRG, documentCPF, titleJob, roleJob}
<br>

> Novo representante para esse cliente
##### Route
- POST /client/:id/representative
##### Response
- id

> Alteracão de um representante deste cliente
##### Route
- PATCH /client/:id/representative
##### Payload
- {name, nacionality, documentRG, documentCPF, titleJob, roleJob}
##### Response
- id

> Alteracão do status de um representante
##### Route
- PATCH /client/:id/representative
##### Response
- id

### Branchs da feature

Separacão das branchs da feature a ser desenvolvida:

#### SMP-09: create server flow about representatives
- SMP-09-01: create flow to list representatives
- SMP-09-02: create flow to get a representatives
- SMP-09-03: create flow to add a representative
- SMP-09-04: create flow to update a representative
- SMP-09-05: create flow to change status of representative

####  SMP-10: create pages about representatives
- SMP-10-01: create page to list representatives
- SMP-10-02: add flow was created to list representatives
- SMP-10-03: add flow was created to change status of representative
- SMP-10-04: create page to manage a representatives
- SMP-10-05: add flow was created to add a representative
- SMP-10-06: add flow was created to update a representative

### Orders and Payments

- SMP-11: create server flow about orders
- SMP-12: create pages about orders
- SMP-13: create server flow about payments
- SMP-14: create pages about payments

### Fixes
- Visualizacao do dashboard;
- Visualizacao do modal de endereco no mobile;
- Aumento do tempo da sessão ativa;
