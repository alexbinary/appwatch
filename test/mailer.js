
let chai = require('chai')
let expect = chai.expect

let mailer = require('./../src/mailer')

describe('mailer', function () {
  it('works', function () {
    // ## Setup
    let config = {
      user: 'user',
      password: 'password',
      host: 'host'
    }
    // ## TEST
    let mailerInstance = mailer.create(config)
    // ## Assert
    expect(mailerInstance).to.respondTo('send')
    // ## End
  })
})
