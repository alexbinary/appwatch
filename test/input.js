
let chai = require('chai')
let expect = chai.expect

let input = require('./../src/input')

describe('input', function () {
  it('parses command line arguments (default names)', function () {
    let inputHelper = input.createHelper()
    let inputs = inputHelper.process([
      '--configpath', 'configvalue',
      '--statuspath', 'statusvalue',
      '--logpath', 'logvalue'
    ])
    expect(inputs).to.have.property('configpath')
    expect(inputs.configpath).to.equal('configvalue')
    expect(inputs).to.have.property('statuspath')
    expect(inputs.statuspath).to.equal('statusvalue')
    expect(inputs).to.have.property('logpath')
    expect(inputs.logpath).to.equal('logvalue')
  })
  it('parses command line arguments (short names)', function () {
    let inputHelper = input.createHelper()
    let inputs = inputHelper.process([
      '-c', 'configvalue',
      '-s', 'statusvalue',
      '-l', 'logvalue'
    ])
    expect(inputs).to.have.property('configpath')
    expect(inputs.configpath).to.equal('configvalue')
    expect(inputs).to.have.property('statuspath')
    expect(inputs.statuspath).to.equal('statusvalue')
    expect(inputs).to.have.property('logpath')
    expect(inputs.logpath).to.equal('logvalue')
  })
})
