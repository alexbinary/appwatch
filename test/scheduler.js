
let chai = require('chai')
let expect = chai.expect

let duration = require('duration-js')

let scheduler = require('./../src/scheduler')

describe('scheduler', function () {
  it('getNextCheck()', function () {
    // ## Setup
    let conf = {
      checkInterval: duration.parse('1h')
    }
    let now = new Date()
    // ## TEST
    let nextCheck = scheduler.getNextCheck(conf)
    // ## Assert
    expect(nextCheck).to.have.property('timeout')
    expect(nextCheck.timeout).to.be.a('number')
    expect(nextCheck).to.have.property('date')
    expect(nextCheck.date).to.be.instanceOf(Date)
    expect(nextCheck.date.getTime() - now.getTime()).to.be.equal(nextCheck.timeout)
    // ## End
  })
})
