var assert = require('assert')
var { repeat } = require('../src/func')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

describe('Func', function() {
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
})