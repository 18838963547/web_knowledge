var o = {
    name:'zhangsan'
}
function person(a,b,c,d){
    // console.log(this);
    console.log(this.name);
    console.log(a,b,c,d);
}
// person.call(o);
Function.prototype.newCall = function(obj){
    var obj = obj || window
    var argumetArr = []
    for(var i=1;i<arguments.length;i++){
        argumetArr.push('arguments['+i+']')
    }
    console.log(argumetArr);
    obj.p = this // 此时的this指向的是调用这个方法的函数对象本身
    var result = eval('obj.p('+ argumetArr +')')   // 把这个函数对象赋值给传入的对象后并执行
    delete obj.p //移除
    return result

}
// person.newCall(o,'chi','2','3','4')

Function.prototype.newApply = function(obj,arr){
    var obj = obj || window
    obj.p = this // 此时的this指向的是调用这个方法的函数对象本身
    var result = obj.p(...arr)   // 把这个函数对象赋值给传入的对象后并执行
    delete obj.p //移除
    return result
}
// person.newApply(o,['chi','2','3','4']);


Function.prototype.newBind = function(obj){
    var that = this
    var arr1 = Array.prototype.slice.call(arguments,1)
    var ob =function(){}
    newFun = function(){
        var arr2 = Array.prototype.slice.call(arguments)
        arrSum = arr1.concat(arr2)
        if(this instanceof newFun){
            // 使用了new绑定
            that.apply(this,arrSum)
        }else{
            that.newApply(obj,arrSum)
        }
    }
    ob.prototype = that.prototype
    newFun.prototype = new ob
    return newFun;
    // return function(){
    //     var arr2 = Array.prototype.slice.call(arguments)
    //     arrSum = arr1.concat(arr2)
    //     that.newApply(obj,arrSum)
    // }
}
// person.newBind(o,'chi','2','3','4')('dianc')

// bind可以配合new使用，但是this会失效。     
// 这个就很有意思了，bind改变的就是this的指向。现在配合new使用，反而失效了。因为bind后返回的是个函数，既然返回的是个函数，那么就可以使用new了

var bibi = person.newBind(o,'a','b','c')
var b = new bibi('kaola')   // 使用了new.实例（新对象）会绑定到函数调用的this上。new绑定的规则