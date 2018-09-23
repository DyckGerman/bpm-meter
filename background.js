var streamInitialized = false;

var msgTypes = {
    POPUP_LOADED: "POPUP_LOADED",
    BACKGROUND_LOADED: "BACKGROUND_LOADED"
}

chrome.runtime.sendMessage({
    type: msgTypes.POPUP_LOADED
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === msgTypes.POPUP_LOADED && !streamInitialized) {
        chrome.tabCapture.capture({
            audio: true
        }, (stream) => {
            var ctx = new AudioContext();
            analyser = ctx.createAnalyser();
            var source = ctx.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.connect(ctx.destination);

            analyser.fftSize = 2048;
            fpoints = new Float32Array(2048);
            analyser.getFloatFrequencyData(fpoints);
            var a = 5;

            streamInitialized = true;
        });

        chrome.runtime.sendMessage({
            type: msgTypes.BACKGROUND_LOADED
        });
    }
});
