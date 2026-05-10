
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