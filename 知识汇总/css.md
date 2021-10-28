
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