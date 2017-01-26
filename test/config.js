
let chai = require('chai')
let expect = chai.expect

let fs = require('fs')
let path = require('path')

let cson = require('cson')
let duration = require('duration-js')

let config = require('./../src/config')

let testConfigFilePath = path.join(__dirname, 'config.cson')

describe('config', function () {
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
    config.use(testConfigFilePath)
    let conf = config.getConfig()
    // ## Assert
    expect(conf).to.have.property('checkInterval')
    expect(conf.checkInterval).to.be.instanceOf(duration)
    expect(conf.checkInterval.toString()).to.equal('1m')
    expect(conf).to.have.property('smtp')
    expect(conf.smtp).to.have.property('user')
    expect(conf.smtp.user).to.equal('smtp.user')
    expect(conf.smtp).to.have.property('password')
    expect(conf.smtp.password).to.equal('smtp.password')
    expect(conf.smtp).to.have.property('host')
    expect(conf.smtp.host).to.equal('smtp.host')
    expect(conf.smtp).to.have.property('ssl')
    expect(conf.smtp.ssl).to.equal('smtp.ssl')
    expect(conf).to.have.property('email')
    expect(conf.email).to.have.property('from')
    expect(conf.email.from).to.equal('email.from')
    expect(conf.email).to.have.property('to')
    expect(conf.email.to).to.deep.equal(['email.to.1', 'email.to.2'])
    expect(conf).to.have.property('apps')
    expect(conf.apps).to.deep.equal({'app.id': {name: 'app.name'}})
    // ## End
  })
  afterEach(function () {
    fs.unlinkSync(testConfigFilePath)
  })
})
