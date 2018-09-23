var msgTypes = {
    POPUP_LOADED: "POPUP_LOADED",
    BACKGROUND_LOADED: "BACKGROUND_LOADED"
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('loaded');

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === msgTypes.BACKGROUND_LOADED) {

            var bg = chrome.extension.getBackgroundPage();

            console.log('bg.analyser  = ' + bg.analyser);

            var bufferLength = 2048;
            var dataArray = new Uint8Array(bufferLength);
            // analyser.getByteTimeDomainData(dataArray);

            // Get a canvas defined with ID "oscilloscope"
            var canvas = document.getElementById("oscilloscope");
            var canvasCtx = canvas.getContext("2d");

            // draw an oscilloscope of the current audio source

            function draw() {

                requestAnimationFrame(draw);
                if (!bg.analyser) return;

                bg.analyser.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = "rgb(200, 200, 200)";
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "rgb(0, 0, 0)";

                canvasCtx.beginPath();

                var sliceWidth = canvas.width * 1.0 / bufferLength;
                var x = 0;

                for (var i = 0; i < bufferLength; i++) {

                    var v = dataArray[i] / 128.0;
                    var y = v * canvas.height / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
            }

            draw();
        }
    });

    chrome.runtime.sendMessage({
        type: msgTypes.POPUP_LOADED
    });
});
