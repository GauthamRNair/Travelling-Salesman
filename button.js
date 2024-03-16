import { delay, delayNextInClip, currentDelay } from "./anim.js";

class Button {
    constructor(x, y, width, height, text, func) {
        this.pos = [x, y];
        this.size = [width, height];
        this.text = text;
        this.func = func;
    }

    async click() {
        // Frames for animation
        let animFrames = 8;

        let downFrames = Math.floor(animFrames*0.7);
        let upFrames = animFrames-downFrames;

        for(var i=0;i<downFrames;i++) {
            this.pos[1] -= (this.size[1]/5)/downFrames;
        }
        this.func();
        for(var i=0;i<upFrames;i++) {
            this.pos[1] += (this.size[1]/5)/upFrames;
        }
    }
}

export {Button}