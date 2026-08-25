import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { PostPaymentMethodMethodUseCase } from "@/services/use-cases/payment-method/post";
import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/payment-method";


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