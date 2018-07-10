chrome.runtime.onInstalled.addListener(function() {
    console.log('hola');
});
// // var code = function() {
// //     console.log('hola');
// // };
// // var script = document.createElement('script');
// // script.textContent = '(' + code + ')()';
// // (document.head||document.documentElement).appendChild(script);
// script.parentNode.removeChild(script);