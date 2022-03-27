/**
 * @param {string} s
 * @return {string[][]}
 */
 var partition = function(s) {
    var len = s.length
    var res = []
    var dfs = function(s,index,ans){
        if(index == len){
            res.push([...ans])
            return;
        }
        for(var i=index;i<len;i++){
            // 截取当前的子串
            var temp = s.substring(index,i+1)
            if(reversString(temp)){
                ans.push(temp)
                dfs(s,i+1,ans)
                ans.pop()
            }
        }
    }
    dfs(s,0,[])
    return res
};
// 判断是否是回文字符串
var reversString = function(str){
    var len = str.length
    var i=0,j=len-1
    while(i<j){
        if(str[i]==str[j]){
            i++
            j--
        }else{
            return false
        }
    }
    return true
}
console.log(partition('aabc'))

