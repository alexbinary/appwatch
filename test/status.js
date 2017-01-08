
let chai = require('chai')
let expect = chai.expect

let fs = require('fs')
let path = require('path')

let status = require('./../src/status')

let testStatusFilePath = path.join(__dirname, 'config.cson')

describe('status', function () {
  it('works', function () {
    // ## Setup
    let appId = 'test.id'
    let isUp = true
    // ## TEST
    status.use(testStatusFilePath)
    status.setIsUp(appId, isUp)
    let result = status.getIsUp(appId)
    // ## Assert
    expect(result).to.equal(isUp)
    // ## End
  })
  afterEach(function () {
    fs.unlinkSync(testStatusFilePath)
  })
})
