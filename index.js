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