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
- nationality   string
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
- [name, nationality, documentRG, documentCPF, titleJob, roleJob]
<br>

> Listagem de um representante correspondente deste cliente;
##### Route
- GET /client/:id/representative/:idRepresentative
##### Response
- {name, nationality, documentRG, documentCPF, titleJob, roleJob}
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
- {name, nationality, documentRG, documentCPF, titleJob, roleJob}
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

### Orders (3 days)
- Start date on 25/05

### Dados da Entidade

Ordens de serviço todos os usuários podem criar solicitaçoes correspondentes a uma empresa ou cliente. Onde posteriormente podem atrelar a um ou mais pagamentos atrelados a esse serviço.

- clientId      string
- title         string
- description   string
- obs           string
- data          string

#### SMP-11: create server flow about orders

- SMP-11-01: create route and test to add order
- SMP-11-02: create route and test to list orders
- SMP-11-03: create route and test to get order
- SMP-11-04: create route and test to update order
- SMP-11-05: create route and test to soft delete order

#### SMP-12: create pages about orders

- SMP-12-01: create page skeleton to list orders
- SMP-12-02: create integration to list orders
- SMP-12-03: create page skeleton to add order
- SMP-12-04: create integration to add order
- SMP-12-05: create page skeleton to update order
- SMP-12-06: create integration to update order
- SMP-12-07: create integration to delete order

### Payments (3 days)
- Start date on 02/06

Todas as ordens de serviço terão um ou mais pagamentos atrelados a ele. A ideia é construir a estrutura de centralização de informações de cada pedido de serviço acionado por determinada empresa.

#### SMP-13: create server flow about payments
- SMP-13-01: create route and test to add order
- SMP-13-02: create route and test to list orders
- SMP-13-03: create route and test to get order
- SMP-13-04: create route and test to update order
- SMP-13-05: create route and test to soft delete order

#### SMP-14: create pages about payments
- SMP-14-01: create page skeleton to list orders
- SMP-14-02: create integration to list orders
- SMP-14-03: create page skeleton to add order
- SMP-14-04: create integration to add order
- SMP-14-05: create page skeleton to update order
- SMP-14-06: create integration to update order
- SMP-14-07: create integration to delete order

### Process (3 days)

Essa é a sessão principal da aplicação. Onde basicamente serão atrelados os clientes de acordo com cada processo registrado por revista no INPI que gera a cada semana.

### Fixes
- [ ] Visualizacao do dashboard;
- [x] Visualizacao do modal de endereco no mobile;
- [ ] Aumento do tempo da sessão ativa;
