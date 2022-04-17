// 
function sendFormDate(){
    // 创建formdata对象
    var  formdata = new FormData()
    formdata.append('username','zhangsan')
    formdata.append('userage',18)

    // 创建xhr对象
    var xhr = new XMLHttpRequest()
    xhr.open('post','/servier')
    xhr.send(formdata)
    xhr.onreadystatechange = function(){ 
        // 当xhr.readyState改变的时候，都会触发onreadystatechange方法
        if(xhr.readyState){
            // 0：初始状态，未打开
            // 1: 已打卡，未发送
            // 2: 已获取响应头，send方法已被调用，响应状态和响应头已经可以获取到了
            // 3： 正在下载响应体
            // 4: 下载完毕，整个数据传输过程结束
        }
    }
    // 其他属性
    xhr.timeout = 3000
    xhr.responseType = 'text'
}