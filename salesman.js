import { cities } from "./script.js";

function bruteForce() {
    if(!cities) {return []}
    let leastPath = [...cities.keys()];
    let leastDist = Infinity;
    let paths = allPermutation(leastPath);
    for (const path of paths) {
        let pathDist = getLength(path);
        if(pathDist<leastDist) {
            leastDist = pathDist;
            leastPath = path.slice();
        }
    }
    return [leastPath, leastDist];
}

function getLength(order) {
    let dist = 0;
    let lastPos = [];
    let nextPos = [];
    for (const key of order) {
        if(key === order[0]) {
            lastPos = cities[key].pos;
            continue;
        }
        nextPos = cities[key].pos;
        dist += Math.hypot(nextPos[0]-lastPos[0], nextPos[1]-lastPos[1]);
        lastPos = nextPos;
    }
    dist += Math.hypot(cities[order[0]].pos[0]-lastPos[0], cities[order[0]].pos[1]-lastPos[1]);
    return dist;
}

function allPermutation(list) {
    var allLists = [list];
    for(var p=0;p<factorial(list.length-1)-1;p++) {
        var newList = allLists[allLists.length-1].slice();
        var k=[-1, -1];
        var l=[-1, -1];
        for(var i=0;i<newList.length-1;i++) {
            if(newList[i]<newList[i+1] && i>k[0]) {
                k=[i, newList[i]];
            }
            if(i+1>l[0] && newList[i+1]>k[1]) {
                l=[i+1, newList[i+1]];
            }
        }
        newList[k[0]] = l[1];
        newList[l[0]] = k[1];
        let listBegin = newList.splice(0, k[0]+1);
        newList = newList.reverse();
        newList = listBegin.concat(newList);
        allLists.push(newList);
    }
    return allLists;
}

function factorial(n) {
    var rval = 1;
    for(var i=2; i<=n; i++) {
        rval *= i;
    }
    return rval;
}

export {bruteForce}