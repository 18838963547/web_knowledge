// 实现一个函数，将字符串分割，要求每个子字符串正序与反序相等，输出所有可能的拆分方式，格式参见示例：
// 示例：
// 输入：“oox”
// 输出：
// [
//   [“oo”,”x”],
//   [“o”,”o”,”x”]
// ]

// 字符串分割回文字符串
function fn(str, start = 0, items = []) {
    var len = str.length;
    var result = []
    for (let index = start; index < len; index++) {
        if (reverse(str.split(start, index))) {
            var item = []
            item.push(str.split(0, index))
            fn(str, index, item)
            result.push(item)
        } else {

        }
    }
    return result
}
// 判断是否回文
function reverse(str) {
    var len = str.length
    let l = 0,
        r = len - 1
    while (l < r) {
        if (str[l] == str[r]) {
            l++;
            r--
        } else {
            return false
        }
    }
    return true
}

class observer {
    constructor(value) {
            this.observer = []
        }
        // 订阅
    on(fn) {
            if (this.observer.includes(fn)) {
                return;
            }
            this.observer.push(fn)
        }
        // 发布
    off() {
        this.observer.forEach(item => {
            item()
        })
    }
}