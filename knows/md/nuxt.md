### 状态持久化
方法：  利用 vuex 和 cookie/localhost  

### nuxt项目部署

1. build后会生成一个.nuxt的文件，
2. 将.nuxt文件和static package.json nuxt.config.js文件放入到服务器的目录文件中。
3. 进入服务器的文件夹中，安装依赖   
4. 然后运行起来，在服务器本地是可以访问的了  -------此时在服务器本地开启了一个端口服务，可以本地访问。但是不能使用域名访问

5. 使用nginx开启反向代理。将访问的地址，映射到当前服务器的端口上。 配置nginx中的server
6. 使用pm2开启进程守护  pm2 start 开启
