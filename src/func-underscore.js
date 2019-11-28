function property(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key]
  }
}
var getLength = property('length')

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

/**
 * 1. 类数组 length && typeof length === 'number'
 * 2. 数组
 * 3. 类似 {length: 10}的对象
 * @param {*} collection
 */
function isArrayLike(collection) {
  var length = getLength(collection)
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

module.exports = {
  isArrayLike
}