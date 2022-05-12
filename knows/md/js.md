## 设计模式

### 观察者模式
* 定义: 定义了对象间一对多的关系,当目标对象发生改变的时候,,所有依赖它的观察者(Observer)都会得到通知
* 特点:
    1. 一个目标者对象Subject,拥有方法:添加/删除/通知Observer
    2. 多个观察者对象Observer,拥有方法,接收Subject的通知并处理
    3. 目标对象Subject发生状态变更时,通知所有的Observer

* 代码实现
    ```
    class Subject{
        constructor(){
            this.observers = []
        }
        add(observer){
            this.observers.push(observer)
        }
        del(observer){
            let idx = this.observers.findIndex(item => item == observer)
            idx>-1 && this.observers.splice(idx,1)
        }
        nocify(){
            this.observers.foreach(item=>{
                item.update()
            })
        }
    }
    class Observer {
        constructor(name){
            this.name = name
        }
        update(){
            console.log(触发了当前observer的更新)
        }
    }

    ```
* 优点
    1. 功能耦合度性低,专注于自身功能逻辑
    2. 观察者实时接收目标者更新状态
* 缺点
    1. 通知未能区分,不能对事件通知进行细分管控

### 发布订阅模式
* 定义: 基于一个事件中心,希望接收通知的Subscriber(订阅者)通过自定义事件 订阅主题.被激活事件的对象Publisher(发布者)通过发布主题事件的方式通知各个订阅该主题的订阅者。其中主要的意思就是多了一个事件中心,发布者和订阅者通过事件中心进行交流。
* 代码实现
    ```
    class _event {
        constructor(){
            this.eventList = {} // 事件中心,使用对象是可以在获取某种订阅类型的时候,值可以是数组
        }
        // 订阅
        on(type,fn){
            if(!this.eventList[type]){
                this.eventList[type] = []
            }
            this.eventList[type].push(fn)
        }
        // 发布
        trigger(type){
            if(!this.eventList[type]) return new Error('没有此类型事件')
            this.eventLIst[type].forEach(callback=>{
                callback()
            })
        }
        // 删除订阅者
        remove(type,fn){
            if(!this.eventList[type]) return new Error('没有此类型事件')
            idx = this.eventList[type].findIndex(item=>item==fn)
            idx > -1 ? this.eventList[type].splice(idx,1) : return new Error('不存在此订阅者')
        }
    }
    ```
* 优点
    1. 松耦合
    2. 灵活性高
    3. 可靠


### 继承
> 原型链
1. 原型链继承
    方式：子类直接等于父类的实例。 Sub.prototype = new Parent()
    缺点：
        1. 来自原型对象的所有属性被所有实例共享。
        2. 创建子类实例时，无法向父类构造函数传参。

2. 构造函数继承
    * 方式： 在子类中使用call(this)来实现继承
    * 缺点： 只继承了父类的属性和方法，没有继承原型上的属性和方法

3. 组合继承（原型链继承和构造函数继承的合体）
    * 方式： 使用上面的两种方法，完成了继承。但是对于父类的原型来说，是执行了两次的构造的。
    * 第一次 children.prototype = new Parent()  第二次 Parent.call(this)

4. 原型式继承
    方式： 使用object.create()
    * 弊端，使用的是浅拷贝，这样对于引用类型的数据，对于创建的不同的实例对象，内存地址可能相同，改变值会引起其他值的改变。

5. 寄生式继承
    方式： 就是在object.create()外面包裹一层函数，在函数中定义创建出来的对象的属性和方法

6. 寄生组合式继承
    方式： 子类通过构造函数的继承（call）方法来继承父类的属性和方法，子类通过原型式继承（object.create()）来继承父类原型上的的属性和方法
7. es5的继承和es6的继承的区别
    * es5的继承是先创建子类之后，再调用父类的构造函数向已有的对象里面添加属性
    * es6的继承是先通过父类创建一个空对象，然后添加属性和方法，再将该对象作为子类的实例。
### typeof 和 instanceOf
 * typeof 用来判断数据的基本类型，但是他不能判断出null object array 的具体类型，只能判断出他们都属于object
    > 原理： 每个数据在存储的时候都有自己的数据类型标识，通过判断他们的标识来判断的。
    > object number  undefined function symbol string boolean
 * instanceOf 利用原型链来判断当前所属的类型。他只能判断引用类型，不能判断基本类型的数据。因为基本类型没有原型链啊
 * object.prototype.string.call(类型)  [object 类型]


### splice 和 slice  substr和substring
1. splice和slice 对数组操作
    * splice（开始位置，删除的数量，新增的元素） 会改变原数组
    * slice （开始的位置，结束位置） 创建一个新的数组，不会影响原数组。   

2. substr 和 substring
    * substr(开始的位置，数量)
    * substring（开始的位置，结束的位置）\

### 深拷贝和浅拷贝的区别
* 浅拷贝 
    * 浅拷贝是直接拷贝了当前对象的地址。
    * 浅拷贝的方式
        1. object.assign({},obj)
        2. [...obj]
        3. Array.prototype.slice()
        4. Array.prototype.concat()

* 深拷贝
    * 深拷贝是新开辟了一个内存空间，将原有的内容中的数据重新拷贝一份，两者数据不会相互影响。
    * 深拷贝的方式
        1. json.parse(json.stringify())  弊端是不能拷贝 function symbol 和 undefined
        2. 手写循环递归函数
        3. 使用loadsh库的_cloneDeep函数


### 原型链
1. 构造函数创建的实例对象的隐式原型指向构造函数的原型
2. 构造函数的原型对象是一个对象，所以构造函数的原型对象的隐式原型指向的是对象的原型对象object.prototype
3. 对象的原型对象的隐式原型，指向的就是null了
4. 但是构造函数其实也属于被构造出来的，它是被Function构造函数构造出来的，所以构造出来的构造函数的隐式原型指向的是Function.prototype.
5. 这里的Function.prototype是个对象了，所以它就指向了object.prototype了。
6. object.prototype又伴随着 function Object()函数，所以Object()的隐式原型指向的就是Function.prototype了
7. 既然Function.prototype是个原型，那么对应他本身的constructor就是 function Function（）了。在这里就好玩了，function Function（）的隐式原型指向的依旧是Function.prototype。

* Function是最顶层的构造器。而Object是最顶层的对象
* 从原型链上来讲，Function继承了Object
* 从构造器上来讲，Object由Function构造


### onclick 和 addEventlistener的区别
* onclick 只能绑定html元素，而且只能出现一次，多次的话后面会覆盖前面的
* addEventLIstener 可以监听所有的DOM，而不仅仅是html元素
* addEventlistener可以对一个事件绑定多个方法， 不会相互覆盖 
* addEventlistener可以控制lister的触发阶段，冒泡或捕获阶段。

### 事件流
* 捕获阶段
* 目标阶段
* 冒泡阶段  addEventListener的第三个值默认为false，就是默认冒泡

#### 执行顺序
1. 先绑定捕获，后绑定冒泡
    * 执行顺序就是先执行捕获，然后执行冒泡
2. 先绑定冒泡，后绑定捕获
    * 对于目标元素，先绑定那个就先执行那个，
    * 对于非目标元素，先触发捕获阶段，然后执行冒泡阶段

### xmlHttpRequest
> 浏览器的一个api，用来提供客户端与服务端的数据链接

```
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
```