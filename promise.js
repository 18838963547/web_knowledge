class promise {
    // executor 立即执行函数
    constructor(executor){
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        let resolve = value =>{
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value
            }
        }
        let reject = reason =>{
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled,onRejected){
        if(this.state === 'fulfilled'){
            onFulfilled(this.value)
        }
        if(this.state === 'rejected'){
            onRejected(this.reason)
        }
    }
   
}

function Promise1(executor){
    var self = this 
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve=(value)=>{
        if(this.state === 'pending'){
            this.state = 'fulfilled'
            this.value = value
        }
    }
    let reject=(reason)=>{
        if(this.state === 'pending'){
            this.state = 'rejected'
            this.reason = reason
        }
    }
    try {
        console.log(this);
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}
Promise1.prototype.then = function(onFulfilled,onRejected){
    let self = this
    if(this.state === 'fulfilled'){
        onFulfilled(this.value)
    }
    if(this.state === 'rejected'){
        onRejected(this.reason)
    }
}

// this指向问题，新实例被创建后，再在外部环境下执行的resolve方法
// var p1 = new Promise1(function(resolve,reject){resolve(1)})
// console.log(p1);
// p1.then(function(x){console.log(x);})


class Promise2 {
    constructor(fun){
        this.state = 'pending'
        this.value = undefined
        this.reson = undefined
        this.resCallback = []
        this.rejCallback = []
        try {
            fun(this.resolve.bind(this),this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
        
    }
    resolve(val){
        setTimeout(()=>{
             if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = val
                this.resCallback.forEach(callback=>{
                    callback(val)
                })
            }
        })
       
    }
    reject(reason){
        setTimeout(()=>{
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
                this.rejCallback.forEach(callback=>{
                    callback(reason)
                })
            }
        })
    }
    then(onFulfilled,onRejected){
        return new Promise2((resolve,reject)=>{
            onFulfilled = typeof onFulfilled === 'function'?onFulfilled:()=>{};
            onRejected = typeof onRejected === 'function'?onRejected:()=>{};
            switch (this.state) {
                case 'fulfilled': 
                    setTimeout(()=>{
                        onFulfilled(this.value);
                    })
                    break;
                case 'rejected': 
                    setTimeout(()=>{
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
    constructor(fun){
        this.value = undefined
        this.reason = undefined
        this.state = 'pending'
        this.resCallback = []
        this.rejCallback = []
        try {
            fun(this.resolve.bind(this),this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value){
        setTimeout(()=>{
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value
                this.resCallback.forEach(callback=>{
                    callback(value)
                })
            }
        })
        
    }
    reject(reason){
        setTimeout(()=>{
            if(this.state === 'pending'){
                this.state  = 'rejected'
                this.reason = reason
                this.rejCallback.forEach(callback=>{
                    callback(reason)
                })
            }
        })

    }
    then(onFulfilled,onRejected){
      return new Promise3((resolve,reject)=>{
        onFulfilled = typeof onFulfilled === 'function'?onFulfilled:()=>{}
        onRejected = typeof onRejected === 'function'?onRejected:()=>{}
        if(this.state === 'pending'){
            this.resCallback.push(onFulfilled)
            this.rejCallback.push(onRejected)
        }
        if(this.state == 'fulfilled'){
            setTimeout(()=>{
                onFulfilled(this.value)
            })
        }
        if(this.state === 'rejected'){
            setTimeout(()=>{
                onRejected(this.reason)
            })
        }
      })
    }
}