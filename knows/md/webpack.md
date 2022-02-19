### webpack优化
https://juejin.cn/post/6996188856164810789
1. 优化开发体验（优化开发时的构建速度）
    + 缩小文件搜索范围，缩小打包作用域
        1. 配置resolve
        2. noParse标志文件不需要解析
        3. loader和include和exclude配置
    + 开启多线程编译
        1. happyPack（不再维护了）
            > 原理：happypack会在webpack.compiler之后的run函数之后，就会到达happyPack，hp开启一个线程池，线程池将构建任务里面的模块进行一个分配，分配给hp的线程，这些线程再hp线程池中执行，执行完成后，会有一个通信的过程，首先汇集到主线程上，完成构建过程。
            > 把任务分解给多个子进程去并发的执行，子进程处理完成后汇集到主线程进行处理。
        2. thread-loader 开启新的线程
            >原理：与hp类似，wp解析一个模块，tl会将模块和他所依赖的模块分配给worker进程。
    + 使用缓存提升二次打包速度
        1. babel-loader开启缓存
        2. 使用cache-loader
            > 1. 使用：将cache-loader放置其他loader前即可
            > 2. 原理：安装后会将缓存结果放到磁盘中
        3. DllPlugin和DllReferencePlugin 将不经常改变的库单独打包出来，下次不再打包。在下次运行的时候，需要获取到相应的依赖时去读取已经缓存过的依赖
            > 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
    + 使用高版本的webpck4
2. 打包体积优化
    1. 压缩代码
    2. 使用CDN
    3. tree-shaking
    4. scope hoisting 变量作用域提升



### webpack常用loader
1. babel-loader: 将es6语法转为es5语法
2. css相关: 执行顺序从下到上
    * style-loader: 将css文件添加到dom文档中的内联样式标签中
    * css-loader: 允许css文件通过require的方式引入,并返回css代码
    * postcss-loader: 打包css样式,自动添加前缀,为css语法添加前缀
    * less-loader: 将less语法转为css语法
3. file-loader : 修改打包后图片的储存路径，再根据配置修改我们引用的路径，使之对应引入.返回url
4. url-loader: 将引入的文件进行编码,超过一定大小后,使用file-laoder