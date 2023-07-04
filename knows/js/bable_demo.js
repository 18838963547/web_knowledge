// 简单的构建一个babel
// 传入babel，可以调用babel中的类型，在返回的对象中对类型进行操作，完成想要的功能
module.exports = function(babel){
    const {types:t} = babel
    return {
        visitor:{ //作为参观者，要修改的节点的类型
            VariableDeclarator: (path,state)=>{
                if(path.node.id.name = 'a'){
                    path.node.id.name = t.Identifier('b')
                }
            }
        }
    }
}