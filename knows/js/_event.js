class _Event {
    constructor() {
        this.eventList = {}
    }
    // 订阅
    addListenter (type, fn) {
        if (!this.eventList[type]) {
            this.eventList[type] = []
        }
        this.eventList[type].push(fn)
    }
    // 发布
    trigger (type, ...params) {
        if (this.eventList[type]) {
            this.eventList[type].forEach(callback => {
                callback(...params)
            });
        } else {
            return new Error('暂无订阅者订阅此事件')
        }
    }
    remove (type, fn) {
        if (!this.eventList[type]) return new Error('暂无此事件');
        else {
            var idx = this.eventList[type].findIndex(callback => callback === fn)
            if (idx === -1) {
                return new Error('暂无此订阅者')
            }
            this.eventList[type].splice(idx, 1)
            if (this.eventList[type].length === 0) {
                delete this.eventList[type]
            }
        }
    }
}
// https://www.jianshu.com/p/d755909b85f8

// 防抖

function debuddle (fn, wait) {
    var timer
    return function () {
        var that = this
        var arg = [...arguments]
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(that, arg)
        }, wait)
    }
}

// 节流
function throttle (fn, wait) {
    var timer
    return function () {
        const that = this
        var arg = [...arguments]
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(that, arg)
            }, wait)
        }
    }
}

// 柯里化
var judge = (fn, ...args) => fn.length > [...args] ? (...arguments) => judge(fn, ...args, ...arguments) : fn(...args)

// let addsum = (a, b, c) => a + b + c
// var ass = judge(addsum)
// console.log(ass(1)(2, 6));

// 多维数组展开
var flatArr = (arr) => {
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...flatArr(cur)]
        } else {
            return [...pre, cur]
        }
    }, [])
}

// 深拷贝
//WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
function deepClone (obj, map = new WeakMap()) {
    if (typeof obj == 'object') {
        var newObj = Array.isArray(obj) ? [] : {}
        if (map.has(obj)) {
            return map.get(obj)
        }
        map.set(obj, newObj)
        for (const key in obj) {
            newObj[key] = deepClone(obj[key], map)
        }
        return newObj
    } else {
        return obj
    }
}
const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: ['child', 'dfg'],
        child2: {
            child2: 'child2'
        }
    }
};
// console.log(deepClone(target));
// instanceOf
let isType = (type) => (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`
let isTypes = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}

// promiseAll
function myPromiseAll (promiseList) {
    return new Promise((resolve, reject) => {
        var len = promiseList.length
        var result = []
        var count = 0
        for (var i = 0; i < len; i++) {
            Promise.resolve(promiseList[i]).then(res => {
                result.push(res)
                count++
                if (count === len) {
                    return resolve(result)
                }
            }, error => {
                reject(error)
            })
        }
    })
}

// es5继承
function Father (a, b) {
    this.a = a
    this.b = b
}
Father.prototype.speak = function () {
    console.log(this.a + '说话了');
    // console.log(this.a)
}

function Son (c) {
    Father.call(this, a, b)
    this.c = c
}
// 父类的原型指向子类
Son.prototype = Object.create(Father.prototype)
Son.prototype.constructor = Son

Son.prototype.cry = function () {
    console.log(this.c + '哭了')
}

// ES6继承
class Animal {
    constructor(a) {
        this.a = a
    }
    say () {
        console.log('sayu')
    }
}
class Dog extends Animal {
    constructor(b) {
        super(a)
        this.b = b
    }
    go () {

    }
}


// ajax
function pAjax (methods, url, async) {
    var xml = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        xml.onreadystatechange(function (res) {
            if (xml.readystate !== 4) return
            if (xml.status === 200) {
                console.log(xml.responseText)
                resolve(xml.responseText)
            } else {
                // return Error(xml.statusText)
                reject(xml.statusText)
            }
        })
        xml.open(methods, url, async)
        xml.send()
    })
}
