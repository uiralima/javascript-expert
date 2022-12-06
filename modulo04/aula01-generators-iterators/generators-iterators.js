const assert = require('assert')

function *calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello1'
  yield 'Hello2'
  yield 'Hello3'
  //yield calculation(10, 20)
  yield* calculation(10, 20)
}

const generator = main();
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello1', done: false })
assert.deepStrictEqual(generator.next(), { value: 'Hello2', done: false })
assert.deepStrictEqual(generator.next(), { value: 'Hello3', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

//console.log(Array.from(main()))
assert.deepStrictEqual(Array.from(main()), [ 'Hello1', 'Hello2', 'Hello3', 200 ])
assert.deepStrictEqual([...main()], [ 'Hello1', 'Hello2', 'Hello3', 200 ])

////// ------- async iterators

const { readFile, stat, readdir } = require('fs/promises')

function *promissified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

//Promise.all([...promissified()]).then(results => console.log(results))
// ;(async () => {
//   for await (const item of promissified()) {
//     console.log(item.toString())
//   }
// })()

async function *systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log(item)
  }
})()
