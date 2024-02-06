import { delay, delayNextInClip, currentDelay } from "./anim.js";

class City {
    constructor(x, y, size, color) {
        this.pos = [x, y];
        this.fullSize = size;
        this.color = color;
        this.size = 0;
    }

    async animCreation(duration) {
        // Frames for animation
        let animFrames = 20;

        let startDelay = currentDelay();

        // Push other animations after to wait till this ends
        delayNextInClip(duration);

        // Wait to run after previous animations
        let delayVar = await delay(startDelay);

        // Run Animation
        console.log("Start Animation");
        for(var i=0;i<animFrames;i++) {
            let delayVar = await delay(duration/animFrames);
            this.size += this.fullSize/animFrames;
        }
        console.log("End Animation");
    }
}

export {City}