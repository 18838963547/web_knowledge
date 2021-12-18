//  数组转树
function arrToTree (arr, id = null, tree = []) {
    // 遍历数组，
    arr.forEach(element => {
        if (element.pid == id) {
            const newItem = { ...element, children: [] }
            tree.push(newItem)
            arrToTree(arr, element.pid, newItem.children)
        }
    });
    // 返回一个数组，这个数组的父节点id等于传进来的id
}

function start (arr) {
    var tree = []
    arrToTree(arr, null, tree)
    return tree
}

["push"].forEach(function (method) {
    //   缓存数组原始的push方法
    var original = Array.prototype[method];
    var arrayMethods = Object.create(Array.prototype);
    var newPush = function () {
        var args = [],
            len = arguments.length;
        while (len--) args[len] = arguments[len];

        var result = original.apply(this, args);
        // data中每个数组都有一个__ob__的私有属性指向创建的Observer实例
        var ob = this.__ob__;
        // 监听数组的push调用，触发响应式系统
        // 向所有依赖发送通知，告诉数组的值发生变化了
        ob.dep.notify();
        return result;
    };
    Object.defineProperty(arrayMethods, "push", {
        value: newPush,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
});