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

function isObject(obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}

function createAssigner(keysFunc, undefinedOnly) {
  return function(obj) {
    var length = arguments.length

    if (length < 2 || obj == null) return obj

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      
      for (var i = 0; i < l; i++) {
        var key = keys[i]
        obj[key] = source[key]

        if (!undefinedOnly || obj[key] === void 0) {
          obj[key] = source[key]
        }
      }    
    }
    return obj
  }
}

function allKeys(obj) {
  if (!isObject(obj)) return []

  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}

var extend = createAssigner(allKeys)

// function createPredicateIndexFinder(dir) {
//   return function(array, predicate, context) {
//     predicate = cb(predicate, context)

//     var length = getLength(array)

//     var index = dir > 0 ? 0 : length - 1

//     for (; index >= 0 && index < length; index += dir) {
//       if (predicate(array[index], index, array)) {
//         return index
//       }
//     }
//     return -1
//   }
// }



module.exports = {
  isArrayLike,
  extend,
}