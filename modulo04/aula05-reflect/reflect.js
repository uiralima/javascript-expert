'use strict'

const assert = require('assert')

// garantir a semantica dos objetos


// ---- apply
const myObj = {
  add(myValue1, myValue2) {
    return this.value1 + this.value2 + myValue1 + myValue2 // os argumentos this.... serão enviados por quem chama o apply
  }
}

assert.deepStrictEqual(myObj.add.apply({ value1: 10, value2: 20 }, [ 100, 200 ]), 330) // O [ 100, 200 ] são os parâmetros do método add

// porém alguém pode alterar o comportamento padrão do apply

// Function.prototype.apply = () => { throw new TypeError('Eita') }
// assert.deepStrictEqual(myObj.add.apply({ value1: 10, value2: 20 }, [ 100, 200 ]), 330)

myObj.add.apply = function () { throw new TypeError('Eita') }
assert.throws(() => myObj.add.apply({ value1: 10, value2: 20 }, [ 100, 200 ]), 
{
  name: 'TypeError',
  message: 'Eita'
})
// usando Reflect
const result = Reflect.apply(myObj.add, { value1: 10, value2: 20 }, [ 100, 200 ])
assert.deepStrictEqual(result, 330)



// ---- defineProperty
function MyDate() {}
// 2 formas de definir propriedades em uma função
Object.defineProperty(MyDate, 'withObject', { value: () => 'hey there!' })
Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'hey dude!' })
assert.deepStrictEqual(MyDate.withObject(), 'hey there!')
assert.deepStrictEqual(MyDate.withReflect(), 'hey dude!')



// ---- deleteProperty
const withDelete = { user: 'Usuario' }
// Não performático
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)
const withReflect = { user: 'Usuario' }
// Mais performático
Reflect.deleteProperty(withReflect, 'user')
assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false)



// ---- get
// se tentarmos acessar propriedades de tipos estáticos não da erro
assert.deepStrictEqual(1['prop'], undefined)
// mas usando o get dá erro
assert.throws(() => Reflect.get(1, 'prop'), TypeError)



// ---- has
assert.ok('superman' in { superman: 1 })
assert.ok(Reflect.has({ batman: 1 }, 'batman'))



// ---- ownKeys
// Retorna todas as propriedades de um objeto inclusive os Symbols
const user = Symbol('user')
const password = Symbol('password')
const databaseUser = {
  id: 1,
  [password]: '123',
  [user]: 'user'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser), // pega apenas as propriedades não symbol
  ...Object.getOwnPropertySymbols(databaseUser)
]
assert.deepStrictEqual(objectKeys, [ 'id', password, user ])

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [ 'id', password, user ])