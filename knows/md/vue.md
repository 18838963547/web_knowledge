
### 1、vue-router原理
根据设置mode属性，有以下两种实现路由的方式（在浏览器环境中）
![两种方式的不同情况下运用]("../img/v_r.png")
* hash ---利用URL中的hash("#")

* history interface

```
 // 根据mode确定history实际的类并实例化    

// 根据mode确定history实际的类并实例化
switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
```
* hash ---> HashHistory
> HashHistory.push()  将路由添加到浏览器访问历史栈顶 
$router.push() --> HashHistory.push() --> History.transitionTo() --> History.updateRoute() --> {app._route = route} --> vm.render()     

1 $router.push() //调用方法

2 HashHistory.push() //根据hash模式调用,设置hash并添加到浏览器历史记录（添加到栈顶）（window.location.hash= XXX）

3 History.transitionTo() //监测更新，更新则调用History.updateRoute()

4 History.updateRoute() //更新路由

5 {app._route= route} //替换当前app路由

6 vm.render() //更新视图

> HashHistory.replace() 替换当前的路由
```
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}
function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}
```
* history interface ---> HTML5History
>History interface是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。
从HTML5开始，History interface有进一步修炼：pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改：
```
window.history.pushState(stateObject, title, URL)window.history.replaceState(stateObject, title, URL)
```
stateObject: 当浏览器跳转到新的状态时，将触发popState事件，该事件将携带这个stateObject参数的副本

title: 所添加记录的标题

URL: 所添加记录的URL

### 2、diff算法原理

#### 虚拟DOM virtualDom 
借鉴了snabbdom（速度）原理。 是使用TS写的 

diff是发生在虚拟dom上的

*（html变为虚拟dom属于模板编译的范畴。）*

#### h函数用来产生虚拟节点（vnode）
    这个函数就是在app.vue里面创建的时候渲染的那个函数。把dom转换为虚拟dom（模板编译）
h函数可以嵌套，从而实现多级dom 
```
h('ul',{},[
    h('li',{},'牛奶'),
    h('li',{},'咖啡'),
    h('li',{},'香蕉')
])
将得到一个js代码虚拟dom树.(代码没有补充完整，大致是会这样一级一级的生成)
{
    "sel":'ul',
    "data":{},
    "children":[
        {},
        {},
        {}
    ]
}
```



### 3. slot原理 
https://juejin.cn/post/6997966632022704135#heading-5
https://juejin.cn/post/6975422620988604452#heading-5
* 回顾整个挂载流程: 执行父组件的_render函数生成vNode,在创建的过程中,为响应式数据收集依赖.遇到组件时,创建组件的vNode,如果组件有子节点,则创建子节点的vNode,并将zi节点的vNode添加到componentOptions.children中,当中的子节点就是插槽中的内容.



### vue打包

1. 如何解决 Vue 打包 vendor 过大的问题？Webpack 打包 vue 速度慢怎么办？
    1.1 vue-router 懒加载
    > 原理：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效
    > 疑问：这样的方式应该只是在页面加载的过程中使展示的项目快速加载，并没有起到打的包变小吧？
    > ans:（运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。所以并不是减少了打包体积。这里放到解决vue打包bendor体积过大问题这里不合适，应该再加一句，首次响应时间。
    1.2 使用gzip压缩
        a:webpack打包的时候压缩--插件Compression-webpack-plugin
            压缩以后会在目录中生成gz文件，生成gz文件后。在nginx中设置了gzip_static_on后，会加载相应的文件压缩文件，如果找不到，就加载未压缩过的。
        b:浏览器请求js文件的时候，服务器进行压缩
            nginx举例: 
            gzip的配置，首先是开启gzip，设置缓冲区大小，压缩的等级，需要压缩的文件
    1.3 使用CDN引入资源
    1.4 配置webpack的external，不打包第三方库
    1.5 配置 DllPlugin 和 DllReferencePlugin 将引用的依赖提取 -- https://segmentfault.com/a/1190000016567986   第三方包打包出来引入,避免再次打包


### SPA单页应用
> spa单页就是值web在初始化的时候加载html,css,js等资源。一旦加载完成，不会因为跟用户的交互而刷新整个页面。而是通过路由的方式进行页面的跳转和用户的交互
* 优点： 1. 用户交互友好，方便用户操作。 2. 前后端分离，便于开发
* 缺点： 1. 首屏加载资源多，可能产生白屏现象。 2. 不利于seo的优化，因为资源都是动态加载的。


### VUE2的object.defineProperty中的缺点

1. 对于新添加的属性或删除的属性，界面不会更新，需要使用this.$set 或者 this.$delete
2. 直接更改数组的下标，界面不会更新
3. 性能问题，绑定问题（自己平常说的）


### vuex的原理
1. vuex实际上是一个对象
2. 这个对象里面有install方法和Store类
3. store实例里将传入的state包装为data,然后调用new Vue()创建响应式数据
4. 调用vue.use方法，执行install，在install方法里， 调用vue.minix将当前的vuex中的store实例混入到Vue实例的options上，在组件初始化的时候，挂载到每个组件上

### 组件通信
> $on：监听事件（在vue3中被去掉了）。同时被去掉的还有$off,$once。同时在VUE3中，不在使用eventBus.
> $children 移除，不在使用，转而使用ref进行替换
> $listeners 移除，因为vue3中的事件监听都是1⃣以on开头的attribute，所以直接归类到$attrs上，对于接收事件的$listeners就没有存在的意义了。
1. 父子组件通信
  props / $emit / ref / $parent / $attrs
2. 兄弟组件通信
  $parent / vuex / enventBus / $root
3. 跨层级通信
  provide+inject  / vuex / eventBus

### v-for和v-if的优先级
* vue2中
    v-for的优先级是高于v-if的，但是在vue3中则是相反的
    * 不建议两者同时使用，因为在v-for中渲染的过程中需要先执行循环，再判断条件。这样写就不断地进行判断，影响性能。建议使用computed来过滤。
    * 源码层面： 在源码层面，生成的渲染函数是先执行了v-for循环,然后在循环中将v-if转化为一个三元表达式，通过对每个元素进行判断，然后生成虚拟dom。
* vue3中
    v-if的优先级高于v-for
    * 如果两者写在一起，那么先执行v-if，就会获取不到循环的元素，所以就会报错。
    * 源码层面：先执行if再执行for,目的就是为了避免有人非要写一起吧。

### vue生命周期
思路：
1. 给出概念
2. 列举各个生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 在vue3中的变化

答案：
1. vue2生命周期  
    1. 创建vue实例
    2. 初始化事件和生命周期
    3. 执行beforeCreate（）
    4. 初始化data,methods等属性 / 初始化注入，校验
    5. 执行created()
    6. 判断是否有el属性
        6.1 如果有，判断是否有template模板
            6.1.1 有template模板，就把模板编译为渲染函数
            6.1.2 没有template模板，就编译el的html标签元素作为模板
        6.2 如果没有，就等待加载了el后，在执行下一步
        此时只是在内存中渲染好了模板，并没有挂载到页面上
    7. 在挂载前，render函数首次被调用生成虚拟dom，
    8. 执行beforeMount（在挂载之前）
    7. 创建vue实例下的$el(虚拟)，并将虚拟dom替换成真正的dom
    9. Mounted
    12. 执行阶段，如果有更新
    13. 执行beforeUpdate
    14. 执行updated
    15. 销毁阶段beforedestroy
    16. 销毁destroyed

2. vue3的生命周期
    1. 先通过Vue.createApp(options)创建出一个app实例，app.mounted(el)来调用，如果没有el,则直接不再执行
    2. 在vue3中还有setup生命周期，这个生命周期最先执行的。
    2. 初始化事件和生命周期
    3. beforeCreate()
    4. 初始化属性和方法 / 初始化注入，校验
    5. created()
    6. 判断是否有template属性
        6.1 有，将模板编译为渲染函数
        6.2 无，将根标签作为模板
    7. 在挂载执行，执行render函数生成虚拟dom
    8. beforeMounte
    9. 将虚拟dom转为真实的dom结构并挂载
    10. Mounted
    11. 执行更新阶段
    12. 执行阶段，如果有更新
    13. 执行beforeUpdate
    14. 执行updated
    15. 卸载阶段beforeUnmounte
    16. 卸载UnMounted
3. 同上
4. 结合实践
    > 在不同阶段的时候执行不同的任务，beforeCreate不常用，但也是重点关注的地方
    1. beforeCreate阶段：通常用于插件开发中执行一些初始化任务
    2. setup什么时候执行的？为什么

### vue双向绑定使用和原理 v-model
思路：
1. 双向绑定的定义
2. 双向绑定带来的好处
3. 在哪里使用双向绑定
4. 使用方式，使用细节，vue3变化
5. 原理

答案：
> v-model作为语法糖，就是 v-bind和@input的缩写。
> input，textarea标签使用value/input  checkbox和radio使用checkout和change  select元素使用value和change
> 同时也可以使用不同的修饰符.使用model:{prop:'value',event:'change'}来修改
> 对于v-bind.sync(:title.sync='pageTitle'),相当于在子组件中调用了$emit('updata:title',xxx)方法