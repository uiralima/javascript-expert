const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

assert.deepStrictEqual(new Object().__proto__, {}.__proto__, 'new Object() is {}?')
assert.deepStrictEqual(obj.__proto__, Object.prototype)

assert.deepStrictEqual(arr.__proto__, Array.prototype)

assert.deepStrictEqual(fn.__proto__, Function.prototype)

assert.deepStrictEqual(obj.__proto__.__proto__, null)
//========================================================
function Employee() {}
Employee.prototype.salary = () => 'salary**'
//console.log(Employee.prototype.salary())

function Supervisor() {}
//herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
//console.log(Supervisor.prototype.salary())
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'
//console.log(Manager.prototype.salary())

// Se não chamar o new, o primeiro __proto__ vai ser sempre a instância de function base
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('---------------')

//Quando chamamos o new, o __proto__ recebe o prototype atual do objeto
console.log(`manager.__proto__: ${new Manager().__proto__}, manager.salary: ${new Manager().salary()}`)
console.log(Supervisor.prototype === new Manager().__proto__.__proto__)
console.log(Employee.prototype === new Manager().__proto__.__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)
assert.deepStrictEqual(Employee.prototype, new Manager().__proto__.__proto__.__proto__)

console.log('---------------')

const manager = new Manager()
console.log(manager.salary())
console.log(manager.profitShare())
console.log(manager.monthlyBonuses())
console.log(manager.__proto__) //Manager
console.log(manager.__proto__.__proto__) //Supervisor
console.log(manager.__proto__.__proto__.__proto__) //Employee
console.log(manager.__proto__.__proto__.__proto__.__proto__) //O protótipo de todo objeto é um objeto vazio {}
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__) //O prototipo do objeto vazio é null

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('---------------')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()
assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
