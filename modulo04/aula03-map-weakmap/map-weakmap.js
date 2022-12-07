const assert = require('assert')

const myMap = new Map()

myMap
  .set(1, 'one')
  .set('String', {text: 'two'})
  .set(true, () => 'hello')

const mapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log(myMap)
// console.log(mapWithConstructor)
// console.log('get', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('String'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// ------------ Em objetos a chave só pode ser string ou symbol (number écoergido a string)

const onlyRefereneWorks = { id: 1 }
myMap.set(onlyRefereneWorks, { chave: 'Valor' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyRefereneWorks), { chave: 'Valor' })

// ------------ Utilitarios
// Contar numero de propriedades
// - No object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// Verficar se existe uma chave
// - Em object a melhor maneira seria ({ name: 'Nome'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyRefereneWorks))

// Remover uma chave
// Em object seria delete item.id
assert.ok(myMap.delete(onlyRefereneWorks)) // retorna true or false se encontrou ou não a chave que está sendo removida


// Não da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
//console.log([...myMap])
// for(const [key, value] of myMap) {
//   console.log(`${key} => ${value}`)
// }


// Object é inseguro, pois vc pode substituir qualquer propriedade ou comportamento pelo nome da chave
//  Exemplo:
//    ({ }).toString() === '[object Object] // Nativamente
//    ( { toString: () => 'Alterado o comportamento' }).toString() === 'Alterado o comportamento'
// qualquer chave pode colidir com propriedades herdadas do objeto
assert.deepStrictEqual(({ }).toString(), '[object Object]')
assert.deepStrictEqual(( { toString: () => 'Alterado o comportamento' }).toString(), 'Alterado o comportamento')


// ------------ WeakMap

// Pode ser coletado após perder a referência
// usado em casos específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
//  Só chaves de referências, préviamente conhecidas
// mais leve e prevê leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

