
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