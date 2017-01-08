
let chai = require('chai')
let expect = chai.expect

let hybridLogger = require('./../src/hybridLogger')

describe('hybridLogger', function () {
  it('creates logger', function () {
    // ## Setup
    let name = 'test-log'
    let filepath = 'test-log'
    // ## TEST
    let logger = hybridLogger.create({name, filepath})
    // ## Assert
    expect(logger).to.respondTo('info')
    expect(logger).to.respondTo('error')
    // ## End
  })
})
