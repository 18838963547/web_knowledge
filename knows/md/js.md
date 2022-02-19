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