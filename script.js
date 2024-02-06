import { City } from "./city.js";
import { startClip, endClip, delay } from "./anim.js";

const cityColor = "white";
const citySize = 10;
var cities = [];

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

    // Create cities on click
    canvas.addEventListener("click", function(e) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        let deleting = false;
        cities = cities.flatMap((city) => {
            if(Math.hypot(mouseX-city.pos[0], mouseY-city.pos[1]) < city.size){
                deleting = true;
                return [];
            }
            return city;
        });
        if(!deleting) {
            addCity(mouseX, mouseY);
        }
    });
}

function drawLoop() {
    requestAnimationFrame(drawLoop);
    drawCities();
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
            addCity(cityX, cityY);
        }else {
            i--;
        }
        
    }
    endClip();
}



function addCity(x, y) {
    var newCity = new City(x, y, citySize, cityColor);
    cities.push(newCity);
    newCity.animCreation(500)
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