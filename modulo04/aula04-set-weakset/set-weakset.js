const assert = require('assert')

const arr1 = [ 0, 2, 1 ]
const arr2 = [ 0, 3, 2 ]
const arr3 = arr1.concat(arr2)
assert.deepStrictEqual(arr3.sort(), [ 0, 0, 1, 2, 2, 3])

const set = new Set()
arr1.forEach(item => set.add(item))
arr2.forEach(item => set.add(item))
assert.deepStrictEqual(Array.from(set).sort(), [ 0, 1, 2, 3])

assert.deepStrictEqual(Array.from(new Set([ ...arr1, ...arr2 ])).sort(), [ 0, 1, 2, 3 ])

// keys e values em sets tem o mesmo valor
assert.deepStrictEqual(Array.from(set.keys()).sort(), [ 0, 1, 2, 3 ])
assert.deepStrictEqual(Array.from(set.values()).sort(), [ 0, 1, 2, 3 ])

// No Array comun, para saber se um item existe
// [].indexOf(1) !== -1 ou [].includes(1)
assert.ok(set.has(1))

// mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não no array e é isso
// na documentação tem exemplos sobre como fazer uma iteração, saber o que tem em uma lista e não
// tem na outra e assim por diante

// tem nos 2 arrays
const set1 = new Set([
  1, 2, 4, 5
])
const set2 = new Set([
  7, 2, 6, 5
])
const intersection = new Set([...set1].filter(f => set2.has(f)))
assert.deepStrictEqual(Array.from(intersection), [ 2, 5 ])

const difference = new Set([...set1].filter(f => !set2.has(f)))
assert.deepStrictEqual(Array.from(difference), [ 1, 4 ])


// WeakSet tem as mesmas limitações do WeakMap

