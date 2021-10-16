
### 闭包
概念：闭包就是指有权访问另外一个作用域中的变量的函数。

被访问的作用域的变量会继续存在，不会被销毁。
作用：
1. 匿名自执行函数。（有的函数只需要执行一次，其内部变量无需维护，可以用闭包）
2. 结果缓存 （不会释放函数外部的引用，从而函数内部的值可以保留）

### Promise
定义：Promise是一个对象，代表了一个异步操作的最终完成或者失败

### new运算符
1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的constructor）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。
```
function _new(fn,...args){
    var obj = {}
    obj.__proto__ = fn.prototype
    fn.apply(obj,...args)
    return obj
}
```
### Object.create()
```
Object._create = function(obj){
    function Fn(){}
    Fn.prototype = obj
    return new Fn()
}
```
### 对象深拷贝
```
function deepCopy(obj){
    if(typeof obj != 'object') return
    var newObj = obj instanceof Array?[]:{}
    for(var item in obj){
        newObj[item] = typeof obj[item] =='object'?deepCopy(obj[item]):obj[item]
    }
    return newObj
}
```

### 手写promise 