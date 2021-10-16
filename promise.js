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

var p1 = new Promise1(function(resolve,reject){resolve(1)})
// console.log(p1);
p1.then(function(x){console.log(x);})