const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

function getInput(){
    console.log();
    posX = MouseEvent.clientX;
    posY = MouseEvent.clientY;
    console.log("Mouse X position: " + posX + "\nMouse Y position: " + posY);
}

window.onload = function(){
    document.addEventListener('click', getInput);
}