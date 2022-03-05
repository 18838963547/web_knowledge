
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
