
let chai = require('chai')
let expect = chai.expect
chai.use(require('chai-datetime'))

let duration = require('duration-js')

let scheduler = require('./scheduler')

describe('scheduler', function () {
  it('computes time of next check from config and reference date', function () {
    // ## TEST
    let nextCheck = scheduler.getNextCheck({
      config: {
        checkInterval: duration.parse('1h')
      },
      dateRef: new Date('2017-01-08 12:00:00')
    })
    // ## Assert
    expect(nextCheck).to.have.property('timeout')
    expect(nextCheck.timeout).to.equal(1 * 60 * 60 * 1000)
    expect(nextCheck).to.have.property('date')
    expect(nextCheck.date).to.equalDate(new Date('2017-01-08 13:00:00'))
    // ## End
  })
})
