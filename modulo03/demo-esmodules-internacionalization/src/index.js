//1 Moto,Submarino 25000000 2000-01-02 2010-05-06
import database from './../database.json'
import Person from './person.js'
import { Repository } from './repository.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

const respository = new Repository()

async function mainLoop() {
  try {
    const answer = await terminalController.question('What?\r\n')
    if (answer === STOP_TERMINAL) {
      terminalController.closeTreminal()
      console.log('process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await respository.save(person)
    return mainLoop()
  }
  catch(error) {
    console.log(error.stack)
    return mainLoop()
  }
}

await mainLoop()










