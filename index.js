/**
 * @param {string} s
 * @return {string[][]}
 */
 var partition = function(s) {
    var len = s.length
    var res = []
    var dfs = function(s,index,ans){
        if(index == len){
            res.push([...ans])
            return;
        }
        for(var i=index;i<len;i++){
            // 截取当前的子串
            var temp = s.substring(index,i+1)
            if(reversString(temp)){
                ans.push(temp)
                dfs(s,i+1,ans)
                ans.pop()
            }
        }
    }
    dfs(s,0,[])
    return res
};
// 判断是否是回文字符串
var reversString = function(str){
    var len = str.length
    var i=0,j=len-1
    while(i<j){
        if(str[i]==str[j]){
            i++
            j--
        }else{
            return false
        }
    }
    return true
}
console.log(partition('aabc'))

// 继承

function Parent () {
    this.name = 'xiaoming'
}
Parent.prototype.eat = function () {
    console.log(this.name)
}

function Sub () {

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
