function repeat(str, times) {
  let result = ''

  while(times--) {
    result += str
  }
  return result
}

function repeat2(str, times) {
  let result = ''

  if (!str || times === 0) {
    return result
  }

  do {
    if (times % 2) {
      result += str
    }

    times = Math.floor(times / 2)
    if (times) {
      str += str
    }
  } while(times)

  return result
}

module.exports = {
  repeat,
  repeat2,
}