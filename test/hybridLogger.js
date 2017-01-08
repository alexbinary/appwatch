
let chai = require('chai')
let expect = chai.expect

let fs = require('fs')
let path = require('path')

let hybridLogger = require('./../src/hybridLogger')

let testLogFilePath = path.join(__dirname, 'test.log')

describe('hybridLogger', function () {
  it('creates logger', function () {
    // ## Setup
    let name = 'test-log'
    let filepath = testLogFilePath
    // ## TEST
    let logger = hybridLogger.create({name, filepath})
    // ## Assert
    expect(logger).to.respondTo('info')
    expect(logger).to.respondTo('error')
    // ## End
  })
  afterEach(function () {
    try {
      fs.unlinkSync(testLogFilePath)
    } catch (e) {
    }
  })
})
