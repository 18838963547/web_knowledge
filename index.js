function deleGate (element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
        let el = e.target
        while (!el.matches(selector)) {
            if (el === element) {
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el)
    })
    return element
}
let ul = document.querySelector('#ul');

deleGate(ul, 'click', 'li', function (e) { console.log(e.target.innerText) })
// promise构造函数接受一个函数作为参数，这个函数有两个参数，分别是resolve，reject
// var promise = new Promise((resolve, reject) => {
//         resolve('success')
//         reject('error')
//     })
// promise构造函数中有then方法，生成的实例可以访问then方法。then方法接受两个参数，一个成功的回调和一个失败的回调
// promise.then((val) => {}, (e) => {})

// 如果直接生成一个实例对象调用的话，没办法传参。给他包装一层函数
async function timePromise (ms) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}
// timePromise(1000).then((res) => {
//     console.log(res)
// })
// async function asyncSleep() {
//     for (let index = 0; index < 5; index++) {
//         console.log(index)
//         await timePromise(1000)
//     }
// }
// asyncSleep()



// 用promise实现一个ajax请求
function getMethods () {
    const promise = new Promise((resolve, reject) => {
        const handler = function () {
            if (this.readyState !== 4) return
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        };
        const xhr = new XMLHttpRequest()
        xhr.open('get', URL)
        xhr.onreadystatechange = handler
        xhr.send()
    });
    return promise
}

// 如果返回的promise是reject状态，则会被catch接收到
async function test () {
    await Promise.reject('失败').catch(e => console.log(e + '22'))
    return await Promise.resolve('success')
}
// test().then(
//     v => console.log(v),
//     e => console.log(e + '11')
// )

// 多个请求并发执行
async function test2 () {
    let docs = [{}, {}, {}]
    let promise = docs.map(doc => doc.post())
    let result = await Promise.all(promise)
    console.log(result)
}

// async 原理，就是将生成器函数和自执行器函数包装在一个函数里面
function fn (args) {
    return function (genF) {

    };
}

function spawn (genF) { // 接受生成器函数作为参数
    return new Promise((resolve, reject) => {
        const gen = genF(); // 执行了生成器函数，得到一个内部指针对象
        function setp (nextf) {
            let next;
            try {
                next = nextf()
            } catch (error) {
                reject(error)
            }
            if (next.done) { // next.done是true，结束迭代，返回。
                return resolve(next.value)
            }
            // 将next.value 转为promise对象
            Promise.resolve(next.value).then(function (value) {
                step(function () { return gen.next(value) })
            }, function (e) {
                step(function () { return gen.throw(e) })
            })
        }
        setp(function () { return gen.next(undefined); })
    })
}

// 包装生成器函数的自执行函数
function gengerateAsync (genF) {
    return function () {
        const gen = genF()
        return new Promise((resolve, reject) => {
            function step (nextf) {
                let next;
                try {
                    next = nextf()
                } catch (error) {
                    reject(error)
                }
                if (next.done) { //结束了，就return resolve
                    return resolve(next.value)
                }
                Promise.resolve(next.value).then(function (value) {
                    step(function () { return gen.next(value) })
                }, function (e) {
                    step(function () { return gen.throw(e) })
                })
            }
            step(function () { return gen.next() })
        })
    }

}

// Generator的next接受的参数是上一个yeild语句执行返回的参数

function* henGenerator () {
    yield 'hello'
    yield 'world'
    return ';'
}
// const hen = henGenerator() // 该函数并不执行，返回的是一个指向内部状态的指针。也就是遍历器对象。内部指针从头部或者上一次停下的位置开始执行，直到遇到下一个yield对象
// console.log(hen.next())
// console.log(hen.next())
// console.log(hen.next())
// console.log(hen.next())

function* dataConsumer () {
    console.log('Started');
    const a = yield
    console.log(`1. ${a}`);
    const b = yield
    console.log(`2. ${b}`);
    return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
// genObj.next('a')
// 1. a
// genObj.next('b')
// 2. b

// 对象原生不具备iterator接口，使用生成器为对象的symbol.iterator赋值,让对象具有迭代能力
function* test3 () {
    var object = Object.keys(this)
    for (const iterator of object) {
        yield [iterator, this[iterator]]
    }
}

// render函数书写代码
Vue.component('anchored-heading', {
    render: function (h) {
        return h(
            'h' + this.level, //标签名称
            this.$slots.default //子节点数组
        )
    },
    props: {

    }
})

// 手写事件委托
function delegate (element, enevtType, selector, fn) {
    // element：委托的父元素  eventType：事件类型  selector：绑定的元素，比如说li  fn：执行的函数
    element.addEventListener(enevtType, e => {
        let el = e.target
        while (!el.matches(selector)) {
            // 如果当前的元素不是要绑定的目标元素li,并且当前的元素等于el,则当前元素上的没有绑定事件。直接置空。
            if (el === element) {
                el = null
                break
            }
            // 向上查找
            el = el.parentNode
        }
        // 找到需要执行的元素的时候，执行
        el && fn.call(el, e, el)
    })
    // 返回为element绑定的事件
    return element
}
// 手写事件委托
function _delegate (element, eventType, selector, fn) {

}

// 防抖函数
// 首先会返回一个函数,为什么返回一个函数。因为要执行这个返回的函数，如果返回的函数不再执行了，就最后一次执行我们需要的函数

function debounce (fn, wait) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// 节流函数
// 关键是如果有timer
function throttle (fn, wait) {
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

// 深拷贝
function deepCopy (obj) {
    if (typeof obj != 'object') return obj
    let newObj = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
        newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key]
    }
    return newObj
}
