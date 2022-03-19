// 继承

function Parent() {
    this.name = 'xiaoming'
}
Parent.prototype.eat = function() {
    console.log(this.name)
}

function Sub() {

}
Sub.prototype = new Parent()
Sub.prototype.milk = 'he'
var sub1 = new Sub()
// console.log(sub1.__proto__.__proto__ == Parent.prototype)
// console.log(Sub.prototype.__proto__ == Parent.prototype) // sub1是Sub的实例对象。所以sub的隐式原型指向 Sub.prototype == new Parent(). 父类实例的隐式原型，指向的就是构造函数的原型
    // var sub2 = new Sub()
    // console.log(sub1)
    // console.log(sub2)

    const fxArr = ["One", "Two", "Three"]
    const fxArrs = fxArr.slice(0)
    fxArrs[1] = "love";
    console.log(fxArr) // ["One", "Two", "Three"]
    console.log(fxArrs) // ["One", "love", "Three"]