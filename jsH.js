

function Fun(){}
/**
 * 1、Fun函数创建的时候，自动添加了一个prototype属性，即 Fun.prototype  默认指向一个空的object对象 Fun.prototype = {}
 * 2、创建函数就相当于 Fun = new Function()  所以函数Fun也有个隐式原型  Fun.__proto__ = Function.prototype
 * 3、实例对象的隐式原型等于构造函数的显示原型   但在function Function()  这个函数中的隐式原型和显式原型共同指向了同一个值  Function.prototype 
 */


/**
 * 实现一个new
 */
