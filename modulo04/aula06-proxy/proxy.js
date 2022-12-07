'use strict';
const Event = require('events')

const event = new Event()
const setEventName = 'counter'
const getEventName = 'get-counter'
event.on(setEventName, msg => console.log('counter updated', msg))
event.on(getEventName, msg => console.log('chamou', msg))

const myCounter = {
  counter: 0
}
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(setEventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    event.emit(getEventName, { object, prop })
    return object[prop]
  }
})


// setInterval => executa a xada intervalo de tempo
setInterval(function() {
  proxy.counter += 1
  if (proxy.counter >= 10) clearInterval(this)
}, 1000)

// setTimeout => executa a função após um tempo especificado
setTimeout(() => {
  proxy.counter = 4
  console.log('setTimeout')
}, 100)

// setImediate => executa assincronamente no momento
setImmediate(() => {
  proxy.counter = 3
  console.log('setImediate')
})

// process.nestTick => executa no momento, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})