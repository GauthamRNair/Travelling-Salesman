
// Toolkit to run animations(VERY RUDIMENTARY)
// Everything should be in milliseconds

var isClip = false;
var segmentDelay = 0;

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function startClip() {
    // Starts a given clip and allows other functions to work.

    segmentDelay = 0;
    isClip = true;
}

function delayNextInClip(time) {
    // Pushes any animations in clip to run after current animation ends.

    if(!isClip){return}
    segmentDelay += time;
}

function currentDelay(){
    return segmentDelay;
}

function endClip() {
    segmentDelay = 0;
    isClip = false;
}

export {delay, startClip, delayNextInClip, currentDelay, endClip}