
function createLogger ({name, filepath, bunyan = require('bunyan')}) {
  return bunyan.createLogger({
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
}

module.exports = {
  createLogger
}
