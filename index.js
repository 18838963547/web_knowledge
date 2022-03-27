/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
    var len = s.length
    var result = []
    var map = new Map()
    var wordSet = new Set(wordDict)
    // 回溯
    function backTrack (start, map) {
        if (map.has(start)) {
            return map.get(start)
        }
        var works = []
        if (start == len) {
            works.push([])
        }
        // 结束条件
        for (var i = start + 1; i < len + 1; i++) {
            var curStr = s.substring(start, i)
            if (wordSet.has(curStr)) {
                // 获取这个单词后面的所有可能情况
                var nextWordBreaks = backTrack(i, map)
                for (const item of nextWordBreaks) {
                    work = [curStr, ...item]
                    works.push(work)
                }
            }
        }
        map.set(start, works)
        return works
    }
    const res = backTrack(0, map)
    for (const item of res) {
        result.push(item.join(" "))
    }
    return result
};
wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"])