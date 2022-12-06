import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

export class Repository {
  async save(person) {
    const databaseFile = resolve('./database.json')
    const currentData = JSON.parse((await readFile(databaseFile)).toString())
    currentData.push(person)
    await writeFile(databaseFile, JSON.stringify(currentData))
  }
}