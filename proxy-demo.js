function OriginalOne () {}
OriginalOne.prototype.check = (a,b,c) => { console.log('orig one, a: ' + a + ', b: ' + b + ', c: ' + c); };
OriginalOne.prototype.secondCheck = (a,b,c) => { console.log('orig one, a: ' + a + ', b: ' + b + ', c: ' + c); };
var a = new OriginalOne();


proxyObject(OriginalOne.prototype, tracerFn);

a.check(4,5,6);
a.secondCheck(22222, 33333,666,888);

function tracerFn(fn, args) { 
    console.log(args);
    console.log('proxy called');
    fn.apply(this, args);
}

function proxyMetnod(obj, propName, proxyFn) {
    console.log('obj[propName]' + obj[propName]);
    var originalOne = obj[propName];
    obj[propName] = function(){
        proxyFn(originalOne, arguments);
    }
}

function proxyObject(obj, proxyFn) {
    for (var key in obj) {
        proxyMetnod(obj, key, proxyFn);
    }
}
