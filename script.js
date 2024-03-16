import { addCity } from "./city.js";
import { Button } from "./button.js";
import { startClip, endClip, delay } from "./anim.js";
import { bruteForce } from "./salesman.js";

const cityColor = "white";
const citySize = 10;
var cities = [];
var currPath = [];

var canvas;
var ctx;

// Number of ms between frames
const dt = 1000/60;


init();


function init() {
    // Initialize variables and set canvas size
    canvas = document.getElementById('TravellingSalesman');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initCities(3);
    drawLoop();

    // Create buttons
    var nums = [0,1,2,3,4]
    console.log(bruteForce());

    // Create cities on click
    canvas.addEventListener("click", function(e) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        cityClick(mouseX, mouseY, citySize, cityColor);
    });
}

function cityClick(mouseX, mouseY, citySize, cityColor) {
    let deleting = false;
    cities = cities.flatMap((city) => {
        if(Math.hypot(mouseX-city.pos[0], mouseY-city.pos[1]) < city.size){
            deleting = true;
            return [];
        }
        return city;
    });
    if(!deleting) {
        addCity(mouseX, mouseY, citySize, cityColor);
    }
    currPath = bruteForce()[0];
    console.log(currPath);
}

function drawLoop() {
    requestAnimationFrame(drawLoop);
    drawCities();
    drawPath(currPath);
    delay(dt);
}

function initCities(numCities) {
    let minSideLen = Math.min(canvas.width/2, canvas.height/2);
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    let padding = 50;
    startClip();
    for (var i = 0; i < numCities; i++) {
        let cityX = Math.random() * canvas.width;
        let cityY = Math.random() * canvas.height;
        if (Math.hypot((cityX-centerX), (cityY-centerY)) < (minSideLen-padding)) {
            addCity(cityX, cityY, citySize, cityColor);
            // currPath.push(i);
        }else {
            i--;
        }
        
    }
    endClip();
}


function drawCities() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < cities.length; i++) {
        ctx.fillStyle = cities[i].color;
        ctx.beginPath();
        ctx.arc(cities[i].pos[0], cities[i].pos[1], cities[i].size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawPath(path) {
    if(!path) {
        return;
    }else{
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        for(var i=0;i<path.length;i++) {
            ctx.beginPath();
            let startCity = cities[path[i]];
            let endCity = cities[path[(i+1)%path.length]];
            ctx.moveTo(startCity.pos[0], startCity.pos[1]);
            ctx.lineTo(endCity.pos[0], endCity.pos[1]);
            ctx.stroke();
        }
    }
}

export {cities}
