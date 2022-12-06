const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
;(async () => {
  const fibonacci = new Fibonacci()
  {
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    for await (const i of fibonacci.execute(3)) {}
    const expectCallCount = 4
    deepStrictEqual(spy.callCount, expectCallCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    const { args } = spy.getCall(2)
    const expectedResult = [ 0, 1, 1, 2, 3 ]
    const expectedArgs = [ 3, 1, 2]
    deepStrictEqual(args, expectedArgs)
    deepStrictEqual(results, expectedResult)
  }
})()