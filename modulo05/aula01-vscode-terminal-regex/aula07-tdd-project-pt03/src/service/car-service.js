const Tax = require('../entity/tax')
const Transaction = require('../entity/transaction')
const BaseRepository = require('../repository/base')

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({
      file: cars
    })
    this.currencyFormat = new Intl.NumberFormat('pt-BR', { 
      style: 'currency',
      currency: 'BRL'
     })
     this.taxesBasedOnAge = Tax.taxesBasedOnAge
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * (listLength))
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return carId
  }

  async getAvailableCar(carCategory) { 
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBasedOnAge
      .find(f => f.from <= age && f.to >= age)
      return this.currencyFormat.format(tax * price * numberOfDays)
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays)
    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const dueDate = today.toLocaleDateString('pt-BR', options)
    const transaction = new Transaction({
      customer,
      amount: finalPrice,
      car,
      dueDate
    })

    return transaction

  }
}

module.exports = CarService