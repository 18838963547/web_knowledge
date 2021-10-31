function getMonth(startMonth,endMonth){
    var result = []
    // 转为时间戳
    let sm = getDate(startMonth,1).getTime()
    const em = getDate(endMonth).getTime()
    while(sm<em){
        var curTime = new Date(sm)
        result.push(formatDate(curTime))
        curTime.setMonth(curTime.getMonth()+1)
        sm = curTime.getTime()
    }
    return result
}

function getDate(date,addMonth=0){
   var [year,month] = date.split('-')
   return new Date(year,month-1+addMonth)
}
function formatDate(date){
   return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,0)}`
}

console.log(getMonth("2018-08", "2018-12"));