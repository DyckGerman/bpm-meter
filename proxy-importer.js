chrome.browserAction.onClicked.addListener(
    function(tab) {
        var a = JSON.stringify(chrome.tabs);
        chrome.tabs.executeScript({
            file: 'proxy.js'
        });
    });
