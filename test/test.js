var assert = require('assert')
var { repeat,repeat2 } = require('../src/func-repeat')
var { isArrayLike } = require('../src/func-underscore')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

describe('Func-repeat', function() {
  /**
   * repeat test
   */
  describe('#repeat("x", 0)', function() {
    it('times: 0, result: ""', function () {
      assert.equal(repeat('x', 0), '')
    })
  })

  describe('#repeat("x", 1)', function() {
    it('times: 1, result: "x"', function () {
      assert.equal(repeat('x', 1), 'x')
    })
  })

  describe('#repeat("x", 2)', function() {
    it('times: 2, result: "xx"', function () {
      assert.equal(repeat('x', 2), 'xx')
    })
  })

  describe('#repeat("x", 4)', function() {
    it('times: 4, result: "xxxx"', function () {
      assert.equal(repeat('x', 4), 'xxxx')
    })
  })

  /**
   * repeat2 test
   */
  describe('#repeat2("x", 0)', function() {
    it('times: 0, result: ""', function () {
      assert.equal(repeat2('x', 0), '')
    })
  })

  describe('#repeat2("x", 1)', function() {
    it('times: 1, result: "x"', function () {
      assert.equal(repeat2('x', 1), 'x')
    })
  })

  describe('#repeat2("x", 2)', function() {
    it('times: 2, result: "xx"', function () {
      assert.equal(repeat2('x', 2), 'xx')
    })
  })

  describe('#repeat2("x", 4)', function() {
    it('times: 4, result: "xxxx"', function () {
      assert.equal(repeat2('x', 4), 'xxxx')
    })
  })
})

describe('Underscore', function() {
  describe('#un-isArrayLike', function () {
    it('[1, 2] is Array', function () {
      assert.equal(isArrayLike([1, 2]), true)
    })
    it('{length: 10} is Array', function() {
      assert.equal(isArrayLike({ length: 10 }), true)
    })
  })
})