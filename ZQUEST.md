#### xl
1. Vue3的新特性
    https://juejin.cn/post/6940454764421316644#heading-17
    https://juejin.cn/post/6952671223989927943
    1.1 不在限制只有一个根节点 Fragment(片段)

    1.2 响应式使用Proxy
    1.3 **使用了setup生命周期**
    * 可以将生命周期进行挂载，轮到了就执行。
    
    1.4 **支持摇树优化 Tree-shaking supporting**
    * 所有的API都通过ES6模块化的方式引入，这样就能让webpack或rollup等打包工具在打包时对没有用到API进行剔除，最小化bundle体积

    1.5 reactive和ref
    * reactive处理一些复杂的数据，转为响应式
    * ref处理一些简单的数据，转为响应式数据。当然他也可以处理复杂数据
    * 处理一些大型响应式对象的property时，我们很希望使用ES6的解构来获取我们想要的值，但是很遗憾，这样会消除它的响应式；对于这种情况，我们可以将响应式对象转换为一组ref，这些ref将保留与源对象的响应式关联。
    ```
    var obj =reactive({
        o1:{
            name:''
        },
        o2:{}
    })
    const {o2} = ToRefs(obj) 
    ```
    1.6 wathc响应式侦听 wathcEffect

    1.7 组合API
    1.8 Teleport 传送 翻译过来就是传送、远距离传送的意思；顾名思义，它可以将插槽中的元素或者组件传送到页面的其他位置；
    1.9 Suspense 它允许我们的程序在等待异步组件时渲染一些后备的内容，可以让我们创建一个平滑的用户体验；

2. vue3使用Proxy 替代 object.definePrototype的原理
3. vite和webpack的区别，vite是怎么打包的
4. ESModuel  和commonjs的区别
    commonjs
    > require获取 module.exports导出
    > 同步  本地
    > 运行时加载。区别与AMD引入的时候就加载
    > 生成一个对象
    > 对外是使用的拷贝模式
    
    ESmodule
    > import加载  export导出
    > 编译时加载
    > 对外实现是引用关系
    > 静态分析

    AMD
    > require.config 引入
    > require 加载
    > define 定义
    > 异步   引用模块的代码都放到一个回调函数中，加载完毕后执行
    > 只要引用了就加载进来

5. nuxt页面中的其他模板的路由是怎么定义的
    nuxt-link
6. 防抖节流函数（耻辱！！！！）
    防抖 只执行最后一次
    ```
    function panny(){
        console.log('ceshi')
        console.log(this)
    }
    function debunce(fn,timeout=100){
        let timer;
        return function(){
            let ctx = this
            var args = [...arguments]
            clearTimeout(timer)
            timer = setTimeout(() => {
                //  fn() // 此时的fn是回调函数，回调函数的作用域在全局作用域下 
                fn.apply(ctx,args) 
            }, timeout);
        }
    }
    document.getElementById('test').addEventListener('click',debunce(panny,2000))
    ```
    节流  隔一段时间执行一次
    ```
    function throll(fn,timeout){
        var timer
        return function(){
            var ctx= this
            var args = [...arguments]
            if(!timer){
                timer = setTimeout(() => {
                    timer = null
                    fn.apply(ctx,args)
                }, timeout);
            }
        }
    }
    方法二：
    function throttle(fn,delay){
        let pre = 0
        return function(){
            let ctx = this
            let args = [...arguments]
            let nod = new Date()
            if(nod - pre >delay){
                fn.apply(ctx,args)
                pre = nod
            }
        }
    }
    ```
7. 数组中三个数求最大积
8. vue的事件方法是怎么绑定在结构上的
    https://www.cnblogs.com/WindrunnerMax/p/13629209.html
9. 事件委托机制是什么意思
    我们操作dom元素的时候，有时候会出现很多个例如li一样相同的节点，如果我们给每个li添加一个事件，这样操作起来就会很麻烦，这时候就用到了事件委托机制，我们将事件委托给父元素，利用事件冒泡的原理，来触发事件，这样我们就只用绑定一次就可以了，这样的机制，叫做事件委托机制。
    优点：减少绑定事件，只对一个父元素进行操作即可。
    ```
      <button id="test">add</button>
        <ul id="ul">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    ```
    ```
    var ul = document.getElementById('ul')
    var btn = document.getElementById('test')
    var count = 6
    btn.addEventListener('click',function(){
        var li = document.createElement('li')
        li.innerHTML = count++
        ul.appendChild(li)
    })

    ul.onmouseover = function(e){
        var target = e.target || e.srcElement
        if(target.nodeName.toLowerCase() == 'li'){
            target.style.color = 'red'
        }
    }
    ul.onmouseout = function(e){
        var target = e.target || e.srcElement
        if(target.nodeName.toLowerCase() == 'li'){
            target.style.color = '#000'
        }
    }
    ```



### lx 1
1. 为什么用node搭建服务，node搭建服务的好处
2. loader和plugin 的原理
3. nextTick的运行机制 和原理
4. 做统一化的组件，适用于手机端和pc端（既然底层逻辑一样，做两套岂不是耗费更多的人力）
5. 文档更新机制，减轻人力
6. js的事件循环机制
7. 为什么用npm包，不直接用一个页面呢
8. http2为什么用 多路复用，有什么好处？解决了什么问题
9. 安全问题，xss跨站脚本攻击 怎么防止数据注入
