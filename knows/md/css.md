
### Flex流式布局
display:flex
flex-direction  决定主轴的方向
flex-wrap  决定换行方式
flex-flow 以上两个的简写
justify-content 决定元素在主轴上的对齐方式
align-items  决定在交叉轴上的对齐方式（相当于同一行元素的对齐）
align-content  决定多行的对齐方式

flex-grow 定义项目的放大比例，默认为0
flex-shrink 定义了项目的缩小比例，默认为1
flex-basis 定义了在分配多余空间之前，项目占据的主轴空间
flex: 0 1 auto  以上三个的简写

### css的重绘与回流
* 重绘
当节点需要更改外观而不会影响布局
* 回流
DOM结构的修改，引发dom结构的改变，发生回流

回流必定会引起重。回流的代价更大
[重绘与回流](https://blog.csdn.net/qq_42269433/article/details/81133772)


### Css 预处理器,Less 带来的好处
css预处理器
>为css增加编程特性的拓展语言，可以使用变量，简单逻辑判断，函数等基本编程技巧。 css预处理器编译输出还是标准的css样式 less,
>sass都是动态的样式语言，是css预处理器，css上的一种抽象层。他们是一种特殊的语法语言而编译成css的。 less变量符号是@.
>sass变量符号是$

预处理器解决了哪些痛点
>css语法不够强大。因为无法嵌套导致有很多重复的选择器 没有变量和合理的样式利用机制，导致逻辑上相关的属性值只能以字面量的形式重复输出，难以维护。

常用规范
> 变量， 嵌套语法， 混入， @import, 运算， 函数，继承

css预处理器带来的好处
>css代码更加整洁， 更易维护，代码量更少 修改更快， 基础颜色使用变量， 一处动，处处动。 常用的代码使用代码块， 节省大量代码
>css嵌套减少大量的重复选择器，避免一些低级错误 变量混入大大提升了样式的利用性 额外的工具类似颜色函数（lighten,darken,transparentize）mixins, loops,这些方法使css更像一个真正的编程语言，让开发者能够有能力生成更加复杂的css样式。
### css水滴效果代码
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @keyframes identifier {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .content {
            position: relative;
            top: 10%;
            left: 10%;
            width: 500px;
            height: 500px;
            border: 1px yellow solid;
        }
        
        .water1,
        .water2,
        .water3,
        .water4 {
            position: absolute;
            padding: 20%;
            left: 30%;
            top: 30%;
            border: 1px violet solid;
            box-shadow: 0 0 120px 30px violet inset;
            border-radius: 100%;
            z-index: 1;
            opacity: 0;
        }
        
        .water1 {
            animation: identifier 12s 9s ease-out infinite;
        }
        
        .water2 {
            animation: identifier 12s 6s ease-out infinite;
        }
        
        .water3 {
            animation: identifier 12s 3s ease-out infinite;
        }
        
        .water4 {
            animation: identifier 12s 0s ease-out infinite;
        }
    </style>

</head>

<body>
    <div class="content">
        <div class="water1"></div>
        <div class="water2"></div>
        <div class="water3"></div>
        <div class="water4"></div>
    </div>
    <script src="./jsH.js"></script>
    <!-- <script src="./promise.js"></script> -->
    <!-- <script src="./call_apply_bind.js"></script> -->
</body>

</html>
```

### css3新特性

1. 过渡 transition
2. 动画 naimation
3. 变换: transform
4. 选择器
5. 阴影 box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
6. 边框图片
7. 边框圆角
8. 文字

### css左边固定,右边自适应
1. float浮动
    ```
        .left {
            width: 200px;
            height: 500px;
            border: 1px solid red;
            float: left;
        }

        .right {
            height: 500px;
            border: 1px solid green;
        }
    ```
2.  通过定位实现
    ```
    .left {
        width: 200px;
        height: 300px;
        border: 1px solid red;
        position: absolute;
    }

    .right {
        height: 300px;
        margin-left: 202px;
        border: 1px solid green;
    }
    ```
    Q: 如果使用这种方式,boder存在的时候,并不会显示在一行上,怎么处理?
    A: box-sizing: border-box  边框不占用宽度

3. 通过计算实现
    ```
    .left {
        width: 200px;
        height: 300px;
        /* border: 1px solid red; */
        background: chartreuse;
        float: left;
    }

    .right {
        height: 300px;
        /* margin-left: 202px; */
        float: right;
        background: chocolate;
        width: calc(100% - 200px);
        /* border: 1px solid green; */
    }
    ```
    Q: 存在问题,如果使用了border,那么并不会在一行上,这种情况怎么处理?
    A: box-sizing: border-box  边框不占用宽度

4. flex布局
    ```
        #div {
            width: 100%;
            height: 500px;
            display: flex;
        }

        .left {
            width: 200px;
            height: 100%;
            border: 1px solid red;
        }

        .right {
            height: 100%;
            flex: 1;
            border: 1px solid green;
        }
    ```