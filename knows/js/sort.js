var arr = [12, 23, 45, 23, 53, 23, 56, 32, 8, 24, 673, 343, 23, 13]

// 快速排序
function quickSort (arr) {
    // 找出数组的中间值
    var len = arr.length
    if (len <= 1) return arr
    var middle = Math.floor(len / 2)
    var middleData = arr.splice(middle, 1)[0] // 会改变原数组，所以length会变化
    var left = []
    var right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > middleData) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat([middleData], quickSort(right))
}
// console.log(quickSort([12, 23, 45, 23, 53, 23, 56, 32, 8, 24, 673, 343, 23, 13]))

// 归并排序
// 先拆，再合
function mergeSort (arr) {
    if (arr.length < 2) return arr
    let len = arr.length
    let mid = Math.floor(len / 2)
    var left = arr.slice(0, mid)
    var right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
function merge (left = [], right = []) {
    var result = []
    var i = 0, j = 0
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    while (i < left.length) {
        result.push(left[i])
        i++
    }
    while (j < right.length) {
        result.push(right[j])
        j++
    }
    return result
}
// console.log(mergeSort(arr))