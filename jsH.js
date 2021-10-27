function _new(fn, ...args) {
    var obj = {}
    obj.__proto__ = fn.prototype
    fn.apply(obj, ...args)
    return obj
}

Object.create = function(obj) {
    function Fn() {}
    Fn.prototype = obj
    return new Fn()
}