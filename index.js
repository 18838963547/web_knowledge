/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
    if (maxChoosableInteger >= desiredTotal) return true
    const set = []
    for (let i = 1; i <= maxChoosableInteger; i++) {
        set.push(i)
    }
    const dfs = function (choose, sum) {
        for (let i = 0; i < choose.length; i++) {
            if (sum + choose[i] >= desiredTotal) {
                return true
            }
            const setCopy = JSON.parse(JSON.stringify(choose))
            const idx = setCopy.indexOf(choose[i])
            setCopy.splice(idx, 1)
            console.log(setCopy, sum + choose[i])
            if (!dfs(setCopy, sum + choose[i])) {
                return true
            }
        }
        return false
    }
    return dfs(set, 0)
};