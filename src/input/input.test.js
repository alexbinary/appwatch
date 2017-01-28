
let chai = require('chai')
let expect = chai.expect

let input = require('./input')

describe('input', function () {
  it('parses command line arguments (default names)', function () {
    let args = input.parseCliArgs([
      '--configpath', 'configvalue',
      '--statuspath', 'statusvalue',
      '--logpath', 'logvalue'
    ])
    expect(args).to.have.property('configpath')
    expect(args.configpath).to.equal('configvalue')
    expect(args).to.have.property('statuspath')
    expect(args.statuspath).to.equal('statusvalue')
    expect(args).to.have.property('logpath')
    expect(args.logpath).to.equal('logvalue')
  })
  it('parses command line arguments (short names)', function () {
    let args = input.parseCliArgs([
      '-c', 'configvalue',
      '-s', 'statusvalue',
      '-l', 'logvalue'
    ])
    expect(args).to.have.property('configpath')
    expect(args.configpath).to.equal('configvalue')
    expect(args).to.have.property('statuspath')
    expect(args.statuspath).to.equal('statusvalue')
    expect(args).to.have.property('logpath')
    expect(args.logpath).to.equal('logvalue')
  })
})
