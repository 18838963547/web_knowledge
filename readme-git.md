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
            ![nginx图](/img/1.png）
            gzip的配置，首先是开启gzip，设置缓冲区大小，压缩的等级，需要压缩的文件
    1.3 使用CDN引入资源
    1.4 配置webpack的external，不打包第三方库
    1.5 配置 DllPlugin 和 DllReferencePlugin 将引用的依赖提取 -- https://segmentfault.com/a/1190000016567986

2. 什么是 CSP? 
> 内容安全策略（CSP）
> CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。
> 两种方式开启内容安全策略：
> 1.1 一种是设置 HTTP 首部中的 Content-Security-Policy;
> 1.2 一种是设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">

3. 说一下 Vue 中 EventBus（事件总线） 的使用？在使用过程中有没有遇到重复触发的问题？如何解决的？
https://github.com/lgwebdream/FE-Interview/issues/1195

4. Vue 切换路由时，需要保存草稿的功能，怎么实现？
https://github.com/lgwebdream/FE-Interview/issues/1193

5. Vue2.x 为什么要求组件模板只能有一个根元素？
https://github.com/lgwebdream/FE-Interview/issues/1192

6. 你知道 Vue 的模板语法用的是哪个 web 模板引擎的吗？说说你对这模板引擎的理解?
https://github.com/lgwebdream/FE-Interview/issues/1191
补充：了解模板引擎的工作原理      render函数   把vue原理再学一遍

7. 说一下你对 vue keep-alive 的理解？以及使用过程需要注意的地方？
https://github.com/lgwebdream/FE-Interview/issues/1190
补充：了解 组件的 activated 和 deactivated 这两个生命周期钩子函数
*组件使用了keep-alive 会将当前组件缓存，如果数据更新了，可以使用activated生命周期来进行更新，不然数据无法更新*
https://blog.csdn.net/qq_41485414/article/details/113698404

8. 说一下你觉得的 vue 开发规范有哪些？
https://github.com/lgwebdream/FE-Interview/issues/1188

9. 模拟实现 Symbol  (复杂度高)
https://github.com/lgwebdream/FE-Interview/issues/1185

10. 说一下对事件流的理解,如果 addEventListener 的第三个参数设置为 true 会发生什么?
https://github.com/lgwebdream/FE-Interview/issues/1182

11. Reflect.ownKeys 与 Object.keys 的区别
https://github.com/lgwebdream/FE-Interview/issues/1181
补充：为什么obj.keys没有遍历出使用object.defineProperty定义的属性？
答：https://blog.csdn.net/qq_41944936/article/details/118099599   定义属性的时候需要定义是否可枚举。vue绑定数据过程就是使用了这个重新定义所有的data

12. 说一下 vite 和 webpack 对比，为什么 vite 在 dev 模式下运行速度快很多？
https://github.com/lgwebdream/FE-Interview/issues/1180
疑问1：由于 vite 利用的是 ES Module，因此在代码中（除了 vite.config.js 里面，这里是 node 的执行环境）不可以使用 CommonJS ？why。看b站关于es moudles  commondjs AMD 规范讲解
疑问2: HMR机制是什么？原理？ https://www.jianshu.com/p/95f5f51e6fc7
疑问3: webpack的sourceMap  提供开发代码与打包后代码的一个映射关系，方便调试

13. class 的继承和 prototype 继承 是完全一样的吗？
https://github.com/lgwebdream/FE-Interview/issues/1179
es6继承：https://es6.ruanyifeng.com/#docs/class-extends

14. 说一下你对 Get 请求传参长度限制的理解？
https://github.com/lgwebdream/FE-Interview/issues/1202

15. 说下 URL 和 URI 的区别？
https://github.com/lgwebdream/FE-Interview/issues/1201
URL: 统一资源定位器
URI: 统一资源标识符

16. 说下 LRU 算法的原理并手写实现？一般有哪些优化方式？（最近最少使用）

17. js中的运算符逗号，
> ,逗号表示 代码全部执行，但是只返回最后一个逗号后面的运算表达式的结果

18. Map 数据类型
理解：set每次往后面添加一个，然后利用keys().next()可以取到第一个值（理解为最早插入的值）

