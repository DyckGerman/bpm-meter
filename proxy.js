console.log(`proxy imported`);

function tracerFn(fn, args) { 
    console.log(args);
    console.log('proxy called');
    fn.apply(this, args);
}

function proxyMetnod(obj, propName, proxyFn) {
    try{
        var originalOne = obj[propName];
        obj[propName] = function(){
            proxyFn(originalOne, arguments);
        }
        console.log(`'${propName}' mocked`);
    } catch(ex) {
        console.log(`failed to proxy '${propName}'`);
    }
}

function proxyObject(obj, proxyFn) {
    for (var key in obj) {
        proxyMetnod(obj, key, proxyFn);
    }
}
