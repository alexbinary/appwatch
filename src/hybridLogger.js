
let bunyan = require('bunyan')

function create ({name, filepath}) {
  let logger = bunyan.createLogger({
    name,
    streams: [
      {
        path: filepath
      },
      {
        type: 'raw',
        stream: {
          write (data) {
            console.log(data.time + ' ' + data.msg)
          }
        }
      }
    ]
  })
  return logger
}

module.exports = {
  create
}
