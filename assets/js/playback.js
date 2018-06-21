window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var osc1 = audioCtx.createOscillator();
var gain1 = audioCtx.createGain();
osc1.connect(gain1);
gain1.connect(audioCtx.destination);
gain1.gain.value = 0.33;
osc1.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
osc1.frequency.value = 440; // value in hertz
// osc1.start();

let osc2 = audioCtx.createOscillator();
let gain2 = audioCtx.createGain();
osc2.connect(gain2);
gain2.connect(audioCtx.destination);
gain2.gain.value = 0.33
osc2.type = 'sine';
osc2.frequency.value = 659;
// osc2.start();

var osc3 = audioCtx.createOscillator();
var gain3 = audioCtx.createGain();
osc3.connect(gain3);
gain3.connect(audioCtx.destination);
gain3.gain.value = 0.33;
osc3.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
osc3.frequency.value = 1109; // value in hertz
// osc3.start();


function playNote(){
    osc1.start();
    osc2.start();
    osc3.start();
    for(let i = 30; i > 1; i--){
        setTimeout(function(){
            gain1.gain.value -= 0.01;
            gain2.gain.value -= 0.01;
            gain3.gain.value -= 0.01;
        }, 10)
    }
    

    setTimeout(function(){
        osc1.stop();
        osc2.stop();
        osc3.stop();

    }, 5000)
}