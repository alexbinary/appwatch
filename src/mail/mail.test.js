
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let mail = require('./mail')

let emailjs = {
  server: {
    connect: sinon.spy()
  }
}

describe('mail', function () {
  it('creates a mailer', function () {
    // ## TEST
    let config = {
      host: 'host',
      user: 'user',
      password: 'password'
    }
    mail.createMailer({
      config,
      emailjs
    })
    // ## Assert
    expect(emailjs.server.connect).to.be.calledWithExactly(config)
    // ## End
  })
})
