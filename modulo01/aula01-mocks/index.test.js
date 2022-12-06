const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

async function execTest() {
  {
    const filePath = './aula01-mocks/mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './aula01-mocks/mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './aula01-mocks/mocks/invalid-header.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const expected = [
      {
        "name": "Nome1",
        "id": 123,
        "profession": "profissão1",
        "birthDay": new Date().getFullYear() - 1
      },
      {
        "name": "Nome2",
        "id": 456,
        "profession": "profissão2",
        "birthDay": new Date().getFullYear() - 2
      },
      {
        "name": "Nome3",
        "id": 789,
        "profession": "profissão3",
        "birthDay": new Date().getFullYear() - 3
      }
    ]
    const filePath = './aula01-mocks/mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
}

execTest()