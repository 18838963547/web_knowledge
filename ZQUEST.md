### 项目难点 --审批
1. 审批流 组件的开发和功能模块的抽取。
    1.1 将常用的三块内容抽离出，作为组件功能。功能抽取部分的设计
    1.2 需要抽离哪些内容？如何保证内容的独立性。
    1.3 提高可维护性
    1.4 链式和table样式的数据保持一致。链式结构的链式数据转换为数组数据，数组数据转换为链式数据的关系。

2. 对于列表的可扩展性开发
    问题：列表嵌套层级过深，使用插槽开发需要添加过多的重复内容
    解决方案： 通过使用注入的方式，在第一层级将当前的this注入，在使用的地方，通过inject的方式接收到传递的this。然后通过获取到传递的插槽内容，使用render函数将内容渲染到列表中。作为扩展列

3. 项目的安全防御
    xss: 通过使用第三方工具xss.js对当前要渲染的内容进行过滤，将一些不符合规范的过滤掉,也可以设置白名单等。在使用过程中，对于v-html的指令不是很友好，不能实现过滤的效果。刚开始选用的方式是通过自定义一个指令，对内容进行过滤，但是考虑到用到的地方相对来说比较多，不造成项目上的疑惑，然后选用了直接对v-html指令进行复写
    复写方法：直接在webpack的配置中，给vue-loadera添加自定义的指令配置。vue-laoder官方文档说明可以通过compilerOptions来设置自定义指令，
    * 我们知道了在编译前会将我们从vue-loader传入的compilerOptions.directives和baseOptions.directives进行了合并。 这样我们就能覆盖html指令

    * v-html指令的运行原理  https://www.freesion.com/article/5389589953/  （区别于自定义指令）
    在编译之后，create阶段调用了invokeCreateHooks函数，进而执行了updateDOMProps函数，在这个函数中，使用了innerHTML将指令上的value赋值给元素。这样就造成了xss攻击。
    * 自定义指令的运行方式
    在编译之后，同样是进入了invokesCreateHooks函数中，但是调用了updataDirectives方法，然后调用了_update函数更新指令，最终在callHooks$中调用我们自定义的指令。

    * 指令的编译过程
    1. vue单文件中的template部分的编译，是依靠vue-loader中的templateLoader.js来实现的。
    2. vue-loader指定了一个属性compilerOptions用来对编译器进行配置。最终聚合为finalOptions传给compilerTemplate函数（改函数将模版字符串编译为渲染函数）。
    3. compilerTemplate函数中执行actuallyCompiler函数，首先进行了选项的合并，然后执行compile函数进行编译。
    4. 在合并的时候对指令进行合并，将我们从compilerOptions.directives传过来的和baseOptions.directives进行合并

4. 关于模块使用的抽离
    选择人员组件的抽离。提取公共的样式，抽离出组件重复的结构和重复的css

5. webpack工程化,提高打包速度
    1. 使用node的工具iquier命令交互,输入要打包的模块.
    2. 根据输入的打包模块,在webpack解析的时候获取到相应的模块
    3. 根据模块名称,利用fs生成对应的路由文件,
    4. 根据路由文件,加载解析当前引入的模块.项目由原来的300s 缩短到打包单个模块的70S左右.

5. 多行文本省略问题
    在处理多行文本的时候，对于省略号显示的情况的处理，需要通过判断是否有省略号来进行是否对当前内容包裹气泡。
    解决方案：通过封装组件，传入要显示的内容，对传入的内容监听并使用nextTick函数进行处理，获取到当前已渲染的dom，通过判断当前dom的高度来判断。
        * 如果超过，设置伪元素添加省略号，覆盖掉最后的字符。同时渲染带气泡的结构。

6. 基础平台项目加密
    > 原理：改写XMLHttpRequest的原始方法，然后对发起的请求进行拦截，然后对数据进行加密。
    步骤：
    1. 在组件的入口文件处配置中给proxy传入改写的处理逻辑函数。（onRequest,onResponse,onError）
    2. proxy中定义了xhr的各种改写的方法属性，然后调用最终的intercept函数
    3. intercept函数的作用是改写window上的xmlHttpRequest
        1. 首先保存原来的构造函数，将其保存到新定义的一个全局变量中
        2. 然后直接将XMLHttpRequest进行改写
            1. 如果是函数，就直接执行传入的函数，执行之后返回相应的函数，此时返回的是一个闭包函数。
                > 对数据加密的方法是在OnRequest里面的，这个也是通过传入的方法来实现。
            2. 如果不是函数，就使用object.defineProperty（）来获取到原来已经定义好的属性值。
            3. 这里调用new XMLHttpRequest的时候，创建出的实例直接赋值给了xhr，然后将xhr修改后赋值给全局


### nuxt.js项目难点
1. 服务端和客户端都可以进行的请求方法asyncData中，对多个请求使用并行请求，通过使用Promise.all来实现，同时处理好响应的reject，保证不会发生请求中断。
2. 多环境配置 vue项目中使用cross-env.但是在nuxt中并不生效.最后通过使用@nuxtjs/dotenv在配置文件中配置实现

### 质量管理平台项目难点
1. 权限的管理
    1. 登录后从后端获取路由存入vuex中,获取到路由以后解析相应的路由模块,解析之后通过addRouter添加到路由表中,生成相应的路由
    2. 对路由进行守卫,跳转的时候判断是否有相应的路由,如果没有,则重新加载
    3. 按钮权限的控制,获取全部的按钮权限,添加到vuex中,在渲染的时候获取判断是否存在相应的权限.

2. 虚拟列表结合Table的使用。
    1. 结合实现虚拟列表的特点，获取到当前table表格的滚动高度，根据当前的滚动高度和显示区域高度，和每行的高度，截取相关的数据，在出发滚动事件的时候，计算出开始位置和结束位置。
    2. 通过截取当前位置的数据，将数据展示给table


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
6. 防抖节流函数
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
1. 为什么用node搭建服务，node搭建服务的好处 (Node.js适合运用在高并发、I/O密集、少量业务逻辑的场景)
 * 事件驱动  (事件循环机制)
 * 非阻塞式I/O

2. loader和plugin 的原理
    https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/308
 * loader: 充当一个转换的角色,将文件进行转化
    原理: loader转换的三个步骤
    1. 编译 parse()
    2. 优化 optimize
    3. 生成 genernate
 * plugin : 充 当的是一个扩展的功能,为webpack提供更多的扩展功能

3. nextTick的运行机制 和原理
4. 做统一化的组件，适用于手机端和pc端（既然底层逻辑一样，做两套岂不是耗费更多的人力）
5. 文档更新机制，减轻人力
6. js的事件循环机制
7. 为什么用npm包，不直接用一个页面呢
8. http2为什么用 多路复用，有什么好处？解决了什么问题
9. 安全问题，xss跨站脚本攻击 怎么防止数据注入
    csrf 跨站请求伪造

### lx 2
1. map结构怎么实现的底层原理
2. cdn为什么能优化,直接引入一个包不行吗




### zx 1

1. 算法
    ```
    // 实现一个函数，将字符串分割，要求每个子字符串正序与反序相等，输出所有可能的拆分方式，格式参见示例：
    // 示例：
    // 输入：“oox”
    // 输出：
    // [
    //   [“oo”,”x”],
    //   [“o”,”o”,”x”]
    // ]
    ```
2. proxy的缺点
    1. 不支持ie浏览器，也没有polyfill(polyfill是指开发者们希望浏览器提供一些原生支持的api)
    2. 作为新标准，还需要浏览器厂商的持续优化。
3. nexttick的原理
4. data为什么使用函数
5. slot的原理
6. 手写发布订阅模式
7. vue的响应式原理具体是怎么实现的
8. 观察者模式和订阅者模式的区别
9. h5页面的兼容问题，以及h5页面的安全区问题
10. 组件的优化
11. 组件库的设计
12. webpack的babel-loader具体是干嘛的？ 
13. loader的执行顺序，控制css的几个loader分别都是什么作用，都改变了什么？
14. css3的新特性
15. 写出来几种自适应布局，左边固定，右边自适应。如果有border，border重叠了怎么处理？
16. git fetch怎么使用



### lingxing  1
1. 服务端渲染ssr  静态部署  动态部署
2. 继承的几种方式，和es6的区别
3. 抽象类
4. 宏任务和微任务的执行顺序 async 和 promise
5. 正向反向代理
6. 怎么告诉浏览器开启缓存，设置header?
7. vue3特性原理

### 货ll  1  20220308
1. git的使用，rebase
2. 动态组件来替换 slot
3. 算法 [1,2,[3,[4,[5]]]]拍平
4. 上楼梯，经典动态规划问题  dp[i] = dp[i-1]+1 || dp[i-2]+2

### 坐标 1 20220309 3：30  （这个面试官有点让人不爽）
1. 项目参与了生产部署的优化了吗？
2. 四次挥手是什么

### 深兰 1 20220309 20：00 （10分钟结束。没啥东西）
1. ABC页面切换，保留路由状态
2. vuex的持久化
3. 路由url传对象

### cw （没啥东西，逮着vue3问）
1. vue3的组合式API的原理
2. vue的响应式原理是什么

### 丰巢
1. vue2的响应式数据原理？以及对数组是怎么处理的？ object.definePrototyp在数组sort（）的时候，比如排序1-10为逆序，执行了多少次？
2. 浏览器的事件流说一下
3. URL输入到输入，详细的说一下，包括tcp和缓存，还有握手状态
4. 有了解https的加密原理吗？ 怎么避免中间人攻击？
5. 写出这段代码的打印顺序（这个是考察事件循环的，代码里有promise await，settimeout）
6. vue3的diff算法，比较vue2怎么实现的，它的改变解决了哪些问题？以及是怎么对比的
7. 手写二叉树的遍历。递归和迭代两种方式的比较
8. 手写快速排序，时间复杂度是多少？ 什么情况下最糟糕？
9. 还会其他算法吗？举个例子
10. 重绘和回流，怎么引起？ transform会引起吗？
11. es6的新特性，你学习的时候怎么对es6进行整理分类的？
12. Map的查找时间复杂度是多少？为什么？
13. 项目上有啥难点吗？
14. 项目工程化怎么做的？
15. 对项目上做过什么突出的优化吗？




### 面试问题

#### css
1. 
2. 用三种方式实现左边固定右边自适应的两栏布局

#### js
1. js的事件循环机制

#### Vue
1. vue的响应式原理具体是怎么实现的
2. vue中是怎么处理数组的响应的
3. nextTick的原理
4. slot的原理
5. vuex的使用
    * vuex利用响应式，使用起来相当的方便了。但是在使用过程中感觉模块化这一块做的还是比较绕的，用的时候容易出错，需要经常查看文档
    * 例如：访问state的时候要带上模块的key,内嵌模块的话会比较长，不得不配合mapState使用，加不加namespace区别也不大，getters,mutations,actions这些默认是全局的，加上之后必须用字符串来匹配类型的path来匹配，使用模式不统一。容易出错。
    * 对ts的支持也不是很友好，在使用模块时没用代码提示
    * 之前在vue2中使用过vuex-module-decorators的解决方案，虽然类型上有所改善，，但又要学一套新的东西，增加成本。
    * 现在vue3也是推荐使用pinia,使用vue3+pinia会是更好的组合





### 测试dev分支撤回合并

1. 改变dev分支
2. 提交dev分支到dev
3. 从master合并dev分支的数据
4. 撤回master上的分支合并操作。还原
