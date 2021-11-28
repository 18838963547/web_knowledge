var ul = document.getElementById('ul')
var btn = document.getElementById('test')
var count = 6
btn.addEventListener('click',function(){
    var li = document.createElement('li')
    li.innerHTML = count++
    ul.appendChild(li)
})

ul.onmouseover = function(e){
    var target = e.target || e.srcElement
    if(target.nodeName.toLowerCase() == 'li'){
        target.style.color = 'red'
    }
}
ul.onmouseout = function(e){
    var target = e.target || e.srcElement
    if(target.nodeName.toLowerCase() == 'li'){
        target.style.color = '#000'
    }
}