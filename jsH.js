var promise1 = new Promise((resolve,reject)=>{
    resolve()
    reject()
})
var promise2 = new Promise((resolve,reject)=>{
    resolve()
    reject()
})
var promise3 = new Promise((resolve,reject)=>{
    resolve()
    reject()
})

var allPromis = Promise.all([promise1,promise2,promise3]).then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})