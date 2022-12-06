"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



describe('Person suite', () => {
  it('should return a person instance from a string', () => {
    const result = Person.generateInstanceFromString(
      '1 Moto,Submarino 25000000 2000-01-02 2010-05-06'
    )
    const expected = {
      id: '1',
      vehicles: ['Moto', 'Submarino'],
      kmTraveled: '25000000',
      from: '2000-01-02',
      to: '2010-05-06'
    }

    expect(result).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1',
      vehicles: ['Moto', 'Submarino'],
      kmTraveled: '25000000',
      from: '2000-01-02',
      to: '2010-05-06'
    })
    const expected = {
      id: 1,
      vehicles: 'Moto e Submarino',
      kmTraveled: '25.000.000 km',
      from: '02 de janeiro de 2000',
      to: '06 de maio de 2010'
    }

    const result = person.formatted('pt-BR')

    expect(result).to.be.deep.equal(expected)

  })
})