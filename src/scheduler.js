
function getNextCheck (conf) {
  let timeout = conf.checkInterval.milliseconds()
  let now = new Date()
  let date = new Date()
  date.setTime(now.getTime() + timeout)
  return {
    timeout,
    date
  }
}

module.exports = {
  getNextCheck
}
