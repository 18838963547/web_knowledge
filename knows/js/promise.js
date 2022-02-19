class promise0 {
    // executor 立即执行函数
    constructor(executor) {
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then (onFulfilled, onRejected) {
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }
        if (this.state === 'rejected') {
            onRejected(this.reason)
        }
    }

}

function Promise1 (executor) {
    var self = this
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = (value) => {
        if (this.state === 'pending') {
            this.state = 'fulfilled'
            this.value = value
        }
    }
    let reject = (reason) => {
        if (this.state === 'pending') {
            this.state = 'rejected'
            this.reason = reason
        }
    }
    try {
        console.log(this);
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
Promise1.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    if (this.state === 'fulfilled') {
        onFulfilled(this.value)
    }
    if (this.state === 'rejected') {
        onRejected(this.reason)
    }
}

// this指向问题，新实例被创建后，再在外部环境下执行的resolve方法
// var p1 = new Promise1(function(resolve,reject){resolve(1)})
// console.log(p1);
// p1.then(function(x){console.log(x);})


class Promise2 {
    constructor(fun) {
        this.state = 'pending'
        this.value = undefined
        this.reson = undefined
        this.resCallback = []
        this.rejCallback = []
        try {
            fun(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }

    }
    resolve (val) {
        setTimeout(() => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = val
                this.resCallback.forEach(callback => {
                    callback(val)
                })
            }
        })

    }
    reject (reason) {
        setTimeout(() => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.rejCallback.forEach(callback => {
                    callback(reason)
                })
            }
        })
    }
    then (onFulfilled, onRejected) {
        return new Promise2((resolve, reject) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { };
            onRejected = typeof onRejected === 'function' ? onRejected : () => { };
            switch (this.state) {
                case 'fulfilled':
                    setTimeout(() => {
                        onFulfilled(this.value);
                    })
                    break;
                case 'rejected':
                    setTimeout(() => {
                        onRejected(this.reason);
                    })
                    break;
                case 'pending':
                    this.resCallback.push(onFulfilled)
                    this.rejCallback.push(onRejected)
            }
        })

    }
}
// console.log('1');
// var p2 = new Promise2((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('2');
//         resolve(11)
//         reject('reject')
//         console.log(4);
//     })
// })
// p2.then(
//     resolve =>{console.log(resolve);},
//     error =>{console.log(error);}
// )
// console.log('3');

class Promise3 {
    constructor(fun) {
        this.value = undefined
        this.reason = undefined
        this.state = 'pending'
        this.resCallback = []
        this.rejCallback = []
        try {
            fun(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve (value) {
        setTimeout(() => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.resCallback.forEach(callback => {
                    callback(value)
                })
            }
        })

    }
    reject (reason) {
        setTimeout(() => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.rejCallback.forEach(callback => {
                    callback(reason)
                })
            }
        })
    }
    then (onFulfilled, onRejected) {
        return new Promise3((resolve, reject) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { }
            onRejected = typeof onRejected === 'function' ? onRejected : () => { }
            if (this.state === 'pending') {
                this.resCallback.push(onFulfilled)
                this.rejCallback.push(onRejected)
            }
            if (this.state == 'fulfilled') {
                setTimeout(() => {
                    onFulfilled(this.value)
                })
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    onRejected(this.reason)
                })
            }
        })
    }
}

function promiseAll (promiseList) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseList)) throw new Error('argumnetsf must be a array')
        const len = promiseList.length
        let resultArr = []
        let count = 0
        for (let i = 0; i < len; i++) {
            // 执行每个promise,其中有promise可能报错
            Promise.resolve(promiseList[i]).then(val => {
                count++
                resultArr[i] = val
                if (count === len) {
                    return resolve(resultArr)
                }
            }, error => {
                return reject(error)
            })
        }
    })
}



function racePromise (promiseList) {
    var len = promiseList.length
    return new Promise((resolve, reject) => {
        for (var i = 0; i < len; i++) {
            if (promiseList[i] instanceof Promise) {
                promiseList[i].then(resolve, reject)
            } else {
                Promise.resolve(promiseList[i]).then(resolve, reject)
            }
        }
    })
}

let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1)
    }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2)
    }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(3)
    }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
    console.log(res) // [3, 1, 2]
})

class Promise4 {
    constructor(executor) {
        this.state = 'pending'
        this.value = null
        this.reason = null
        this.resCallback = []
        this.rejCallback = []
        let resolve = (val) => {
            if (this.state == 'pending') {
                this.state = 'resolved'
                this.value = val
                this.resCallback.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.state == 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.rejCallback.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected == 'function' ? onRejected : reson => { throw reson }
        return new Promise4((resolve, reject) => {
            if (this.state == 'resolved') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        x instanceof Promise4 ? x.then(resolve, reject) : resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            if (this.state == 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        x instanceof Promise4 ? x.then(resolve, reject) : resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            if (this.state == 'pending') {
                this.resCallback.push(() => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value)
                        x instanceof Promise4 ? x.then(resolve, reject) : resolve(x)
                    });
                })
                this.rejCallback.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        x instanceof Promise4 ? x.then(resolve, reject) : resolve(x)
                    });
                })
            }
        })
    }
}