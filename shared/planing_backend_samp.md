# Requisitos funcionais

- Um usuário consiga adicionar um novo cliente dentro da aplicacão;
- Um usuário consiga retornar os dados de um cliente que ele cadastrou;
- Um usuário consiga retonar todos os clientes que ele cadastrou;
- Um usuário consiga desativar um cliente
- Um usuário consiga atualizar os dados de um cliente dele;



- Clients
  - id
  - legalName
  - tradeName
  - type
  - protocol
  - dataFundation
  - locationAddress
  - correspondenceAddress
  - nameContact
  - numberContact
  - hasActivated ( default=1 )
  - userCreated
  - userResponsable
  - createdAt
  - updateAt

/post /client
  - legalName
  - tradeName
  - type
  - protocol
  - dataFundation
  - locationAddress
  - correspondenceAddress
  - nameContact
  - numberContact
  - hasActivated ( default=1 )

  - userCreated (user loggued)
  - userResponsable (user loggued)
  - createdAt (current date)
  - updateAt (current date)

  - id (uuid generated)

/get /clients
  - legalName
  - tradeName
  - protocol
  - dataFundation

/get /client/{id}
  - legalName
  - tradeName
  - type
  - protocol
  - dataFundation
  - locationAddress
  - correspondenceAddress
  - nameContact
  - numberContact
  - userCreated (user loggued)
  - userResponsable (user loggued)
  - createdAt (current date)
  - updateAt (current date)

/put /client/{id}
  - legalName
  - tradeName
  - type
  - protocol
  - dataFundation
  - locationAddress
  - correspondenceAddress
  - nameContact
  - numberContact
  - userResponsable (user loggued)
  - updateAt (current date)

/patch /client/{id}