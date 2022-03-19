// 手写一个new
function _new (fn, ...args) {
    let obj = {}
    obj.__proto__ = fn.prototype
    var result = fn.apply(obj, args)
    return typeof result == 'object' ? result : obj
}
// 手写一个Object.create()
function _create (obj) {
    function fn () { }
    fn.prototype = obj
    return new fn()
}
// call
function _call (obj, ...args) {
    obj = obj || window
    obj.prototype = this.prototype
    obj.fn = this
    var result = obj.fn(...args)
    delete obj.fn
    return result
}
// apply
function _apply (obj, ...args) {
    obj = obj || window
    obj.prototype = this.prototype
    obj.fn = this
    var result = obj.fn(args)
    delete obj.fn
    return result
}
// bind
function _bind (obj, ...args) {
    obj = obj || window
    var that = this
    function o () { }
    let newf = function (...arg) {
        if (this instanceof o) {
            that.apply(this, [...args, ...arg])
        } else {
            that.apply(obj, [...args, ...arg])
        }
    }
    o.prototype = this.prototype
    newf.prototype = new o()
    return newf
}
// 深克隆
function _deepClone (object) {
    if (typeof object != 'object') return object
    const newObj = Array.isArray(object) ? [] : {}
    for (const key in object) {
        newObj[key] = typeof object[key] == 'object' ? _deepClone(object[key]) : object[key]
    }
    return newObj;
}
function _deepClone2(obj,hash=new WeakMap()){
    if(obj == null) return obj;
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj) 
    if(typeof obj != 'object') return obj
    if(hash.has(obj)) return hash.get(obj)
    let newObj = new obj.constructor()
    hash.set(obj,newObj)
    for(var key in obj){
        if(obj.hasOwnPrototype(key)){
            newObj[key] = _deepClone2(obj[key])
        }
    }
    return newObj
}
// 防抖函数
function _debounce (fn, wait) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
// 节流函数
function _throttle (fn, wait) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, wait)
        }
    }
}
// 事件委托
function _delegate (element, eventType, selector, fn) {
    element.addEventListener(eventType, (e) => {
        let el = e.target
        while (!el.matches(selector)) {
            if (el = element) {
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el)
    })
    return element
}
// promise promiseAll race
function _promiseAll (promiseList) {
    return new Promise((resolve, reject) => {
        let len = promiseList.length
        let count = 0
        let result = []
        for (let index = 0; index < len; index++) {
            Promise.resolve(promiseList[index]).then((val) => {
                result[index] = val
                count++
                if (result.length == count) {
                    return resolve(result)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
function _promiseRace (promiseList) {
    var len = promiseList.length
    return new Promise((resolve, reject) => {
        for (let index = 0; index < len; index++) {
            if (promiseList[index] instanceof Promise) {
                promiseList[index].then(resolve, reject)
            } else {
                Promise.resolve(promiseList[index]).then(resolve, reject)
            }
        }
    })
}
// async原理实现
function generateAsync () {
    return function (genF) {
        return new Promise((resolve, reject) => {
            let gen = genF()
            function step (nextF) {
                let next;
                try {
                    next = nextF()
                } catch (error) {
                    reject(error)
                }
                if (next.done) {
                    return resolve(next.value)
                }
                Promise.resolve(next.value).then(function (v) {
                    step(function () { return gen.next(v) })
                }, function (e) {
                    step(function () { return gen.throw(e) })
                })
            }
            step(function () { gen.next(undefined) })
        })
    }
}
// 柯里化
function _carry (fn, ...args) {
    let judge = (...args) => {
        if (fn.length === args.length) fn(...args)
        else (...arg) => judge(fn, ...args, ...arg)
    }
    return judge
}
// 柯里化
function _carry2(fn){
    let judge = (...args)=>{
        fn.length == args.length ? fn(...args):
        (...arg)=>judge(...args,...arg)
    }
    return judge
}
// 继承
function Parent (name) {
    this.name = name
}
Parent.prototype.eat = function () { }
function Sub () {
    Parent.call(this)
    this.age = age
}
Sub.prototype = Object.create(Parent.prototype)
Sub.prototype.constructor = Sub

// 用promise实现一个ajax请求
function _AjaxPromise () {
    var xhr = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        xhr.open()
        xhr.onreadystateChange = function (res) {
            if (res.readystate !== 4) return
            if (res.status == 200) {
                resolve(res)
            } else {
                reject(res)
            }
        }
        xhr.send()
    })
}
// 拍平数组
function _platArr (arr) {
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...platArr(cur)]
        } else {
            return [...pre, cur]
        }
    }, [])
}
// console.log(platArr([1, 2, [3, [4, [5]]]]))

