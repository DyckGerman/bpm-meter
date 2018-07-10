// //chrome.runtime.onInstalled.addListener(function() {
// //console.log('hola');
// //});

chrome.browserAction.onClicked.addListener(
    function(tab) {
        
            chrome.tabs.executeScript(
                {
                    code: 'console.log("hola imperative");'
                });
        

    });

    


// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });


