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
    self.state = 'pending'
    self.value = undefined
    self.reason = undefined
    function resolve(value){
        if(self.state === 'pending'){
            self.state = 'fulfilled'
            self.value = value
        }
    }
    function reject(reason){
        if(self.state === 'pending'){
            self.state = 'rejected'
            self.reason = reason
        }
    }
    try {
        // console.log('executor');
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}
Promise1.prototype.then = function(onFulfilled,onRejected){
    let self = this
    if(self.state === 'fulfilled'){
        onFulfilled(self.value)
    }
    if(self.state === 'rejected'){
        onRejected(self.reason)
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
console.log('1');
var p2 = new Promise2((resolve,reject)=>{
    setTimeout(()=>{
        console.log('2');
        resolve(11)
        reject('reject')
        console.log(4);
    })
})
p2.then(
    resolve =>{console.log(resolve);},
    error =>{console.log(error);}
)
console.log('3');