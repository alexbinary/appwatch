
let chai = require('chai')
let expect = chai.expect

let fs = require('fs')
let path = require('path')

let cson = require('cson')
let duration = require('duration-js')

let conf = require('./conf')

let testConfigFilePath = path.join(__dirname, 'config.cson')

describe('conf', function () {
  it('reads and parses given config file', function () {
    // ## Setup
    fs.writeFileSync(testConfigFilePath, cson.stringify({
      checkInterval: '1m',
      smtp: {
        user: 'smtp.user',
        password: 'smtp.password',
        host: 'smtp.host',
        ssl: 'smtp.ssl'
      },
      email: {
        from: 'email.from',
        to: ['email.to.1', 'email.to.2']
      },
      apps: {
        'app.id': {
          name: 'app.name'
        }
      }
    }))
    // ## Test
    let config = conf.getConfig(testConfigFilePath)
    // ## Assert
    expect(config).to.have.property('checkInterval')
    expect(config.checkInterval).to.be.instanceOf(duration)
    expect(config.checkInterval.toString()).to.equal('1m')
    expect(config).to.have.property('smtp')
    expect(config.smtp).to.have.property('user')
    expect(config.smtp.user).to.equal('smtp.user')
    expect(config.smtp).to.have.property('password')
    expect(config.smtp.password).to.equal('smtp.password')
    expect(config.smtp).to.have.property('host')
    expect(config.smtp.host).to.equal('smtp.host')
    expect(config.smtp).to.have.property('ssl')
    expect(config.smtp.ssl).to.equal('smtp.ssl')
    expect(config).to.have.property('email')
    expect(config.email).to.have.property('from')
    expect(config.email.from).to.equal('email.from')
    expect(config.email).to.have.property('to')
    expect(config.email.to).to.deep.equal(['email.to.1', 'email.to.2'])
    expect(config).to.have.property('apps')
    expect(config.apps).to.deep.equal({'app.id': {name: 'app.name'}})
    // ## End
  })
  afterEach(function () {
    fs.unlinkSync(testConfigFilePath)
  })
})
