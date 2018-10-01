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

            var bufferLength = 65536;
            var dataArray = new Uint8Array(bufferLength);
            var fftArray = new Uint8Array(bufferLength);
            var myfftArray = null;

            // Get a canvas defined with ID "oscilloscope"
            var canvas = document.getElementById("oscilloscope");
            var canvasCtx = canvas.getContext("2d");

            var canvas2 = document.getElementById("oscilloscope2");
            var canvasCtx2 = canvas2.getContext("2d");

            // draw an oscilloscope of the current audio source

            function draw() {
                requestAnimationFrame(draw);

                bg.analyser.getByteTimeDomainData(dataArray);
                bg.analyser.getByteFrequencyData(fftArray);
                // myfftArray = fft(dataArray, bufferLength);
    
                drawInner(canvasCtx, fftArray);
                drawInner(canvasCtx2, myfftArray);
            }

            function drawInner(ctx, data) {

                if (!bg.analyser) return;

                ctx.fillStyle = "rgb(200, 200, 200)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgb(0, 0, 0)";

                ctx.beginPath();

                var sliceWidth = canvas.width * 1.0 / 128;
                var x = 0;

                for (var i = 0; i < 120; i++) {

                    // var v = myfftArray[i] / 256.0;
                    var v = data[i] / 256.0;
                    var y = v * canvas.height;
                    y = canvas.height - y;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }
                ctx.lineTo(x, canvas.height);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
            }

            draw();
        }
    });

    chrome.runtime.sendMessage({
        type: msgTypes.POPUP_LOADED
    });
});


const pi = 3.14159;

function fft(array, n, k) {
    let result = new Float32Array(n);

    for (let i = 0; i < k; i++) {
        let reSum = 0;
        let imSum = 0;

        for (let j = 0; j < n; j++) {
            reSum += Math.cos(2 * pi * j * i / n) * array[j];
            imSum += Math.sin(2 * pi * j * i / n) * array[j];

        }

        result[i] = Math.sqrt(reSum * reSum + imSum * imSum);
    }

    return result;
}
