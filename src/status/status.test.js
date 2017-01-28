
let chai = require('chai')
let expect = chai.expect

let fs = require('fs')
let path = require('path')

let status = require('./status')

let testStatusFilePath = path.join(__dirname, 'status.cson')

describe('status', function () {
  it('sets the status of an app', function () {
    // ## TEST
    let appId = 'test.id'
    let isUp = true
    status.setIsUp(testStatusFilePath, appId, isUp)
    let result = status.getIsUp(testStatusFilePath, appId)
    // ## Assert
    expect(result).to.equal(isUp)
    // ## End
  })
  it('gets the status of an app', function () {
    // ## Setup
    let appId = 'test.id'
    let isUp = true
    status.setIsUp(testStatusFilePath, appId, isUp)
    // ## TEST
    let result = status.getIsUp(testStatusFilePath, appId)
    // ## Assert
    expect(result).to.equal(isUp)
    // ## End
  })
  afterEach(function () {
    fs.unlinkSync(testStatusFilePath)
  })
})
