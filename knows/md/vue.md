
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
1. diff做什么的
  > diff是在vue的虚拟dom发生变化的时候，用来比较新旧变化的一个算法。
2. 必要性
  > 通过对比虚拟dom，能快速的找到变化的部分，提高更新的速度，同时也避免了多次操作dom，造成性能浪费
3. 何时运行
  > 数据改变的时候，触发dom更新的时候运行。
4. 具体执行方式
  * 更新的时候，生成虚拟dom后，通过patch的方法，对比更新前后两次的数据。
    > 新的是文本，旧的是文本，直接替换
    > 新的是文本，旧的是数组，直接替换
    > 新的是数组，旧的是文本，删除文本，替换为数组
    > 新的是数组，旧的是数组，就通过递归的方式，再次进行对比
  * vue2中的diff算法是采用首尾比较法。
5. vue3中的优化
  * 在vue3中，diff算法进行了优化，在编译的过程中就已经将变化的数据做了相应的标识，在diff进行对比的时候，能够更快速的响应变化。
  * 对比的方式也做了优化，使用了最长递增子序列的方式，来匹配数据的变化


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



### 4. vue打包

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


### 5. SPA单页应用
> spa单页就是值web在初始化的时候加载html,css,js等资源。一旦加载完成，不会因为跟用户的交互而刷新整个页面。而是通过路由的方式进行页面的跳转和用户的交互
* 优点： 1. 用户交互友好，方便用户操作。 2. 前后端分离，便于开发
* 缺点： 1. 首屏加载资源多，可能产生白屏现象。 2. 不利于seo的优化，因为资源都是动态加载的。


### 6. VUE2的object.defineProperty中的缺点

1. 对于新添加的属性或删除的属性，界面不会更新，需要使用this.$set 或者 this.$delete
2. 直接更改数组的下标，界面不会更新
3. 性能问题，绑定问题（自己平常说的）


### 7. vuex的原理
1. vuex实际上是一个对象
2. 这个对象里面有install方法和Store类
3. store实例里将传入的state包装为data,然后调用new Vue()创建响应式数据
4. 调用vue.use方法，执行install，在install方法里， 调用vue.minix将当前的vuex中的store实例混入到Vue实例的options上，在组件初始化的时候，挂载到每个组件上

### 8. 组件通信
> $on：监听事件（在vue3中被去掉了）。同时被去掉的还有$off,$once。同时在VUE3中，不在使用eventBus.
> $children 移除，不在使用，转而使用ref进行替换
> $listeners 移除，因为vue3中的事件监听都是1⃣以on开头的attribute，所以直接归类到$attrs上，对于接收事件的$listeners就没有存在的意义了。
1. 父子组件通信
  props / $emit / ref / $parent / $attrs
2. 兄弟组件通信
  $parent / vuex / enventBus / $root
3. 跨层级通信
  provide+inject  / vuex / eventBus

### 9. v-for和v-if的优先级
* vue2中
    v-for的优先级是高于v-if的，但是在vue3中则是相反的
    * 不建议两者同时使用，因为在v-for中渲染的过程中需要先执行循环，再判断条件。这样写就不断地进行判断，影响性能。建议使用computed来过滤。
    * 源码层面： 在源码层面，生成的渲染函数是先执行了v-for循环,然后在循环中将v-if转化为一个三元表达式，通过对每个元素进行判断，然后生成虚拟dom。
* vue3中
    v-if的优先级高于v-for
    * 如果两者写在一起，那么先执行v-if，就会获取不到循环的元素，所以就会报错。
    * 源码层面：先执行if再执行for,目的就是为了避免有人非要写一起吧。

### 10. vue生命周期
思路：
1. 给出概念
2. 列举各个生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 在vue3中的变化
6. 其他生命周期
  * V2
  > activated: keep-alive缓存的组件激活时
  > deactived: keep-alive缓存组件停用时调用
  > errorCaptured: 捕获一个来自子孙组件的错误时被调用
  * V3
  > activated: keep-alive缓存的组件激活时
  > deactived: keep-alive缓存组件停用时调用
  > errorCaptured: 捕获一个来自子孙组件的错误时被调用
  > renderTracked: 调试钩子，响应式依赖被收集时调用
  > renderTriggered: 调试钩子，响应式依赖被触发时调用
  > serverPrefetch: ssr only 组件实例在服务器上被渲染前调用

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
    > setup中为什么没有beforeCreate和created


### 11. vue双向绑定使用和原理 v-model
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

### 12. Vue如何扩展一个组件
答题思路：
1. 按照逻辑扩展和内容扩展来列举
> 扩展逻辑： mixins,extends,component API
> 内容扩展有slots
2. 分别说出他们的使用方法，场景差异和问题
3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化

### 13. vue如何做权限管理？ 控制到按钮级别的权限怎么做？
* 页面权限 --路由
* 按钮权限 -- 页面

1. 分前端和后端两种方案实现
  * 前端： 前端写好路由表，根据后端返回的角色信息来用meta中的属性来进行判断。判断完成后，将能访问的路由通过addRoute添加动态路由即可
  * 后端： 后端将路由信息返回前端，前端生成路由表，然后通过addRoutes添加
2. 按钮权限
  * 按钮权限一般是通过一个v-permission类似的指令来判断当前的按钮是否应该显示。将按钮要求角色通过值传给v-permission指令，在指令的mounted钩子中可以判断当前用户角色和按钮是否存在交集，有的话则保留，没有的话则移除按钮。

### 14. vue响应式的理解
1. 所谓的响应式，就是当数据变化时能够检测到数据变化，然后根据数据变化做出相应的响应动作。
2. MVVM框架中的核心就是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新。要做到这点就需要对数据做响应式处理。
3. vue通过双向绑定，完成了只需要关心数据，而很少关注dom，以此来完成开发
4. vue通过Objec.defineProperty()来对数据进行拦截监听，当数据发生变化的时候，通知订阅者进行数据变更。数组也通过改写原有的方法完成这一功能，当然数组的元素并不是不能被监听，而是这样做消耗性能太大。缺点： 初始化的递归遍历时候造成性能损失；新增和删除对象属性的时候需要用户调用vue.set和delete这样的特殊api才会生效。对于es6中产生新的Map和Set也不支持
5. 为了改变这些问题，vue3重新编写了这部分的实现，利用ES6中的proxy来完成对数据的劫持监听（代理）。完成响应。缺点：兼容性可能会差点。因为是新的东西，新的东西缺点一般都是兼容性差

### 15. vdom虚拟dom
1. 虚拟dom就是创建出来的一些对象
2. 引入虚拟dom减少了直接操作真实dom产生的消耗和性能问题；同时也可以跨平台审生成相应的内容。
3. 如何生成的？
  > 编译： ast -> generate -> code 

### 16. [vue3新特性](https://v3-migration.vuejs.org/)
1. composition API 
2. SFC Composition API Syntax Sugar <script setup>
  > 在写script的时候使用的语法糖，直接进行包裹
3. Teleport 传送门
4. Fragments 片段
5. Emits Component Option （Emits选项）
6. createRenderer API from **@vue/runtime-core to create custom renderers** （自定义渲染器）
7. SFC State-driven Css Variables(v-bind in <style>) （SFC CSS变量）
8. SFC <style scoped>
9. Suspense

* 更快
  * 虚拟dom重写
  * 编译器优化：静态提升、pathcFlags、block
  * 基于Proxy的响应式系统
* 更小： 更好的摇树优化
* 更容易维护： ts+模块化
* 更容易扩展
  * 独立的响应化模块
  * 自定义渲染器