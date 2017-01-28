
function getNextCheck ({config, dateRef = new Date()}) {
  let timeout = config.checkInterval.milliseconds()
  let date = new Date()
  date.setTime(dateRef.getTime() + timeout)
  return {
    timeout,
    date
  }
}

module.exports = {
  getNextCheck
}
