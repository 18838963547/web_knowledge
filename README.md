## 不要停下
## git怎么提交单个文件夹和拉取单个文件
> git fetch 
> git checkout -m 版本号 文件名 


### 考察严格模式和非严格模式下的形参区别
来自 https://github.com/lgwebdream/FE-Interview/issues/38
```
function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c = 3) {
  c = 10;
  side(arguments);
  return a + b + c;
}
a(1, 1, 1);
// 写出执行结果，并解释原因

// 在严格模式下（给形参赋值后就变成严格模式了），形参和arguments没有绑定关系
// 在非严格模式下，形参和arguments绑定了

```

### this ,call,apply,bind
 https://wangdoc.com/javascript/oop/this.html#%E9%81%BF%E5%85%8D%E5%A4%9A%E5%B1%82-this