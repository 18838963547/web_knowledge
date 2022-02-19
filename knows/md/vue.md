
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

1. 父组件编译
    父组件编译,生成编译后的代码. 类似这种的 _c('div',[]) 

2. 