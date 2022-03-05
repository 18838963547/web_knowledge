/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    if (n == 1) return 1;
    // 找出离N中全部的完全平方数
    var arr = [], i = 1
    while (i * i <= n) {
        arr[i - 1] = i * i
        i++
    }
    var res = Infinity;
    // 找出
    let dfs = function (m, ans) {
        // 递归出口
        if (m == 1 || arr.includes(m)) {
            res = Math.min(ans + 1, res)
            return;
        }
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] > m) continue;
            const m1 = m - arr[i]
            ans++;
            dfs(m1, ans)
            ans--
        }
    }
    dfs(n, 0)
    return res
};
// console.log(numSquares(65))

function two (n) {
    var queue = new Array()
    //记录访问过的节点值
    var visited = new Set()
    queue.push(0);
    visited.add(0);
    //树的第几层
    var level = 0;
    while (queue.length) {
        //每一层的节点数量
        var size = queue.length;
        level++;
        //遍历当前层的所有节点
        for (var i = 0; i < size; i++) {
            //节点的值
            var digit = queue.pop();
            //访问当前节点的子节点，类比于二叉树的左右子节点
            for (var j = 1; j <= n; j++) {
                //子节点的值
                var nodeValue = digit + j * j;
                //nodeValue始终是完全平方数的和，当他等于n的
                //时候直接返回
                if (nodeValue == n)
                    return level;
                //如果大于n，终止内层循环
                if (nodeValue > n)
                    break;
                if (!visited.has(nodeValue)) {
                    queue.push(nodeValue);
                    visited.add(nodeValue);
                }
            }
        }
    }
    return level;
}
console.log(two(12))
