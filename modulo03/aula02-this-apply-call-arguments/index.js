'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log(Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

class Test {
  async showContent(filename) {
    console.log('showContext do Test')
  }
}

const test = new Test()
const file = new File()
//ignora o this da class file e herda o this da função watch(não usando arrow function)
//watch(__filename, file.watch)
//podemos deixar claro o contexto que iremos aplicar
//watch(__filename, file.watch.bind(file)) // com o .bind podemos especificar o contexto do this como parametro
//watch(__filename, file.watch.bind(test)) //Nesse caso irá imprimir 'showContext do Test'
//watch(__filename, (event, filename) => file.watch.call(file, event, filename)) //Tem o mesmo funcionamento do Bind porém o bind repassa os mesmos parâmetros e no Call é necessário passar os parâmetros
watch(__filename, (event, filename) => file.watch.apply(test, [null, filename])) //Tem o call porém recebe um array de argumentos no final