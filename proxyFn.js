function OriginalOne () {}
OriginalOne.prototype.check = (a,b,c) => { console.log('orig one, a: ' + a + ', b: ' + b + ', c: ' + c); };
var a = new OriginalOne();

function proxyMetnod(obj, propName, proxyFn) {
    console.log('obj[propName]' + obj[propName]);
    var originalOne = obj[propName];
    obj[propName] = function(){
        proxyFn(originalOne, arguments);
    }
}

proxyMetnod(OriginalOne.prototype, 'check', (fn, args) => { 
    console.log(args);
    console.log('proxy called');
    fn.apply(this, args);
});

a.check(4,5,6);

function proxyObject(obj, proxyFn) {
    for (var key in obj) {
        proxyMetnod(obj, key, proxyFn);
    }
}

