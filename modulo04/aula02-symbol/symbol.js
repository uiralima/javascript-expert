const assert = require('assert')
const { nextTick } = require('process')

// ---- keys
const uniqueKey = Symbol('userName') // Pode ser usado para criar métodos ou propriedades privadas
const user = {}

user['userName'] = 'userName normal'
user[uniqueKey] = 'symbol property'

// console.log(user['userName'])
// console.log(user[uniqueKey])
// console.log(user[Symbol('userName')])
// console.log(user)

assert.deepStrictEqual(user['userName'], 'userName normal')
assert.deepStrictEqual(user[uniqueKey], 'symbol property')
assert.deepStrictEqual(user[Symbol('userName')], undefined)

// byPass - má pratica
user[Symbol.for('password')] = '123'
assert.deepStrictEqual(user[Symbol.for('password')], '123')

// ---- Well Known Symbols

const obj = {
  [Symbol.iterator]: () => {
    return {
      items: ['c', 'b', 'a'],
      next() {
        return {
          done: this.items.lenght === 0,
          // remove o ultimo e retorna
          value: this.items.shift()
        }
      }
    }
  }
}


for (const item of obj) {
  console.log(item)
}
