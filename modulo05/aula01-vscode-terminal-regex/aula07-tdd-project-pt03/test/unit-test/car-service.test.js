const { describe, it, before, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/service/car-service')
const { join } = require('path')
const carsDatabase = join(__dirname, './../../database', 'cars.json')
const { expect } = require('chai')
const sinon = require('sinon')
const Transaction = require('../../src/entity/transaction')

const mocks = {
  validCategory: require('../mocks/valid-car-category.json'),
  validCar: require('../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

describe('CarService suite tests', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })
 
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [ 0, 1, 2, 3, 4 ]
    const result = carService.getRandomPositionFromArray(data)
    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('Should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCategory
    const carIndex = 0
    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)

  })

  it('Given a car category it should return a available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCategory)
    carCategory.carIds = [car.id]

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car)

      sandbox
        .spy(carService, carService.chooseRandomCar.name)
      
    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })

  it('Given a car category, customer and numberOfDays it should calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer) // Usa-se o Object.create para evitar alterar a instância original
    customer.age = 50
    const carCategory = Object.create(mocks.validCategory)
    carCategory.price = 37.6
    const numberOfDays = 5
    const expected = carService.currencyFormat.format(244.40)
    sandbox.stub(carService, 'taxesBasedOnAge')
      .get(() => [{ from: 40, to: 50, then: 1.3 }])

    const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays)

    expect(result).deep.equal(expected)

  })

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const customer = Object.create(mocks.validCustomer) // Usa-se o Object.create para evitar alterar a instância original
    customer.age = 20
    const car = mocks.validCar
    const carCategory = { // Mesma função do Object.create
      ...mocks.validCategory,
      price: 37.6,
      carIds: [car.id]
    }
    carCategory.price = 37.6
    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'
    const now = new Date(2020, 10, 5)
    sandbox.stub(carService, 'taxesBasedOnAge')
      .get(() => [{ from: 20, to: 30, then: 1.1 }])
    sandbox.useFakeTimers(now.getTime()) // Faz o stub para o Date.now
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name).resolves(car)
    // age: 20, tax: 1.1, carCategory: 37.6
    // 37.6 * 1.1 * 5 days = 206.8
    const expectedAmount = carService.currencyFormat.format(206.80)
    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate
    })

    const result = await carService.rent(customer, carCategory, numberOfDays)

    expect(result).to.be.deep.equal(expected)
  })
})