
let chai = require('chai')
let expect = chai.expect

let input = require('./../src/input')

describe('inputs', function () {
  it('parses args with full names', function () {
    let inputs = input.handle([
      '--configpath', 'configvalue',
      '--statuspath', 'statusvalue',
      '--logpath', 'logvalue'
    ])
    expect(inputs).to.have.property('configpath')
    expect(inputs).to.have.property('statuspath')
    expect(inputs).to.have.property('logpath')
    expect(inputs.configpath).to.equal('configvalue')
    expect(inputs.statuspath).to.equal('statusvalue')
    expect(inputs.logpath).to.equal('logvalue')
  })
  it('parses args with short names', function () {
    let inputs = input.handle([
      '-c', 'configvalue',
      '-s', 'statusvalue',
      '-l', 'logvalue'
    ])
    expect(inputs).to.have.property('configpath')
    expect(inputs).to.have.property('statuspath')
    expect(inputs).to.have.property('logpath')
    expect(inputs.configpath).to.equal('configvalue')
    expect(inputs.statuspath).to.equal('statusvalue')
    expect(inputs.logpath).to.equal('logvalue')
  })
  it('gives default values', function () {
    let inputs = input.handle([])
    expect(inputs).to.have.property('configpath')
    expect(inputs).to.have.property('statuspath')
    expect(inputs).to.have.property('logpath')
    expect(inputs.configpath).to.equal('./config.cson')
    expect(inputs.statuspath).to.equal('./status.cson')
    expect(inputs.logpath).to.equal('./log.log')
  })
})
