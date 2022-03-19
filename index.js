/**
 * @param {number[][]} matrix
 * @return {number}
 */
var dx = [-1, 1, 0, 0]
//      上 下 左 右
var dy = [0, 0, -1, 1]
var longestIncreasingPath = function (matrix) {
    var m = matrix.length
    var n = matrix[0].length
    // 思路： 依次遍历每个位置的值，给每个位置的值答案。
    // 1.创建二维数组
    var max = 1
    var dp = new Array(m).fill().map(() => new Array(n).fill(0))
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            // 这里找到每个点。然后开始上下左右的找。
            max = Math.max(max, dfs(matrix, i, j, dp))
        }
    }
    console.log(max)
    return max
};

var dfs = function (matrix, x, y, dp) {
    // 递归结束条件。 利用要存入的记忆值，来判断是否需要返回。
    if (dp[x][y] != 0) {
        return dp[x][y]
    }
    var k = 0
    var max = 1
    while (k < 4) {
        let newX = x + dx[k];
        let newY = y + dy[k];
        if (newX >= 0 && newX < matrix.length && newY >= 0 && newY < matrix[0].length && matrix[newX][newY] > matrix[x][y]) {
            // 找到下一个点了，然后就递归找下一个点
            max = Math.max(dfs(matrix, newX, newY, dp) + 1, max)
        }
        k++
    }
    dp[x][y] = max
    return max
}

longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]])