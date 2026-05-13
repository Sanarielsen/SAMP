type Address = {
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  country: string
  cep: string
}

//Anotacão: Pelo amor de deus, dá fix nisso...
export function parseAddress(input: string): Address {

  const parserAddress = input.split(",")

  let street, number, complement, district, city, state, country, cep

  //With complement
  if (parserAddress.length === 7) {

    street = parserAddress[0].trim()
    number = parserAddress[1].trim()
    district = parserAddress[2].trim()
    const newPart = parserAddress[3].split("-")
    city = newPart[0].trim()
    state = newPart[1].trim()
    country = parserAddress[4].trim()
    cep = parserAddress[5].trim()
    complement = parserAddress[6].trim()

    return {
      street,
      number,
      district,
      city,
      state,
      country,
      cep,
      complement
    }
  }
  //Without complement
  else if (parserAddress.length === 6) {
    street = parserAddress[0].trim()
    number = parserAddress[1].trim()
    district = parserAddress[2].trim()
    const newPart = parserAddress[3].split("-")
    city = newPart[0].trim()
    state = newPart[1].trim()
    country = parserAddress[4].trim()
    cep = parserAddress[5].trim()


    return {
      street,
      number,
      district,
      city,
      state,
      country,
      cep
    }
  }
}