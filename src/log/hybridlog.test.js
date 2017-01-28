
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let hybridlog = require('./hybridlog')

let bunyan = {
  createLogger: sinon.spy()
}

describe('hybridlog', function () {
  it('creates bunyan logger with a file and a raw stream', function () {
    // ## TEST
    let name = 'test'
    let filepath = 'foo'
    hybridlog.createLogger({name, filepath, bunyan})
    // ## Assert
    let arg = bunyan.createLogger.firstCall.args[0]
    expect(arg).to.have.property('name')
    expect(arg.name).to.equal('test')
    expect(arg).to.have.property('streams')
    expect(arg.streams).to.be.an('array').of.length(2)
    expect(arg.streams[0]).to.deep.equal({path: filepath})
    expect(arg.streams[1]).to.have.property('type')
    expect(arg.streams[1].type).to.equal('raw')
    expect(arg.streams[1]).to.have.property('stream')
    expect(arg.streams[1].stream).to.have.property('write')
    expect(arg.streams[1].stream.write).to.be.a('function')
    // ## End
  })
})
