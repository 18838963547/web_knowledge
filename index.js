/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    var len = triangle.length
    var dp = []
    dp.push(triangle[0])
    for (var i = 1; i < len; i++) {
        var ap = []
        ap.push(dp[i - 1][0] + triangle[i][0])
        for (var j = 1; j < i; j++) {
            ap.push(Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j])
        }
        ap.push(dp[i - 1][i - 1] + triangle[i][i])
        dp.push(ap)
    }
    return Math.min(...dp[len - 1])
};
minimumTotal([[2], [3, 4], [6, 5, 9], [4, 4, 8, 0]])