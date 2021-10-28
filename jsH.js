function forobj(obj) {
    if (typeof obj !== 'object') {
        console.log(obj)
        return obj
    }
    for (const key in obj) {
        var element = obj[key]
        forobj(element)
    }
}
var obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        r: {
            e: 5
        }
    }
}

forobj(obj)