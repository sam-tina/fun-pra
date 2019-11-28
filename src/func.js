function repeat(str, times) {
  let result = ''

  while(times--) {
    result += str
  }
  return result
}

module.exports = {
  repeat
}