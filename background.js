// chrome.browserAction.onClicked.addListener(
//     function(tab) {
//         var a = JSON.stringify(chrome.tabs);
//         chrome.tabs.executeScript({
//             file: 'content.js'
//         });
//     });

// chrome.tabs.onUpdated.addListener(
//     function(tab) {
//         var a = JSON.stringify(chrome.tabs);
//         chrome.tabs.executeScript(tab, {
//             file: 'content.js'
//         });
//     }
// );

// chrome.tabs.onUpdated.addListener(
//     function(tab) {
//         var a = JSON.stringify(chrome.tabs);
//         chrome.tabs.executeScript(tab, {
//             file: 'proxy.js'
//         });
//         chrome.tabs.executeScript(tab, {
//             file: 'content.js'
//         });
//     }
// );
