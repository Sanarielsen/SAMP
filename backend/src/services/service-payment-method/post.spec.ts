import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { PostPaymentMethodMethodUseCase } from "@/services/service-payment-method/post";
import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/in-memory-payment-method-repository";


let paymentMethodRepository: InMemoryPaymentMethodRepository
let sut: PostPaymentMethodMethodUseCase

describe('Create Payment Method Use Case', () => {
  beforeEach(() => {
    paymentMethodRepository = new InMemoryPaymentMethodRepository();
    sut = new PostPaymentMethodMethodUseCase(
      paymentMethodRepository
    )
  })

  it('should create a method payment', async () => {

    const newPaymentMethodName = 'PIX'
    
    const newPaymentMethod = await sut.execute({
      name: newPaymentMethodName,
      order: 1,
    })

    expect(newPaymentMethod.name).toBe(newPaymentMethodName)
  })
})