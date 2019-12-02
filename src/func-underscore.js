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

function isFunction(obj) {
  return typeof obj == 'function' || false
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
  for (var key in obj) keys.push(key) // for in 还包含原型链上的properties
  return keys
}

function keys(obj) {
  if (!isObject(obj)) return []

  if (Object.keys) {
    return Object.keys(obj) // 只返回own enumerable properties组成的数组
  }

  var keys = []

  for (var key in obj)  {
    if (has(obj, key)) { // 只返回own enumerable properties组成的数组
      keys.push(key)
    }
  }
  return keys
}

var extend = createAssigner(allKeys)
var extendOwn = assign = createAssigner(keys)

function has(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key)
}


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

// =======

var isMatch = function(object, attrs) {
  var keys = keys(attrs), length = keys.length

  if (object == null) {
    return !length
  }

  var obj = Object(object)

  for (var i = 0; i < length; i++) {
    var key = keys[i]

    // key不存在，或者key对应的value不相等，均认为键值对不对等
    if (!(key in obj) || (obj[key] !== attrs[key])) {
      return false
    }
  }  
  return true
}

var matcher = matches = function(attrs) {
  attrs = extendOwn({}, attrs)
  return function(obj) {
    return isMatch(obj, attrs)
  }
}

var optimizeCb = function(func, context, argCount) {
  if (context === void 0) {
    return func
  }

  switch (argCount == null ? 3 : argCount) {
    case 1: return function(value) { // 一个参数
      return func.call(context, value)
    }
    case 2: return function(value, other) { // 2个参数
      return func.call(context, value, other)
    }
    case 3: return function (value, index, collection) { // 默认3个参数
      return func.call(context, value, index, collection)
    }
    case 4: return function(accumulator, value, index, collection) {
      return func.call(context, accumulator, value, index, collection)
    }
  }

  return function() {
    return func.apply(context, arguments)
  }
}

var cb = function(value, context, argCount) {
  if (value == null) return identity
  if (isFunction(value)) {
    return optimizeCb(value, context, argCount)
  }
  if (isObject(value)) {
    return matcher(value)
  }
  return property(value)
}

function identity(value) {
  return value
}

function iteratee(value, context) {
  return cb(value, context, Infinity) // context => index || key
}

//array: [2, 3, 4], obj: {name: 'csonchen', age: 26}
var each = forEach = function(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context)

  var i, length;

  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj)
    }
  } else {
    var keys = keys(obj); // [name, age]
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj)
    }
  }

  return obj
}

module.exports = {
  isArrayLike,
  extend,
  each,
}