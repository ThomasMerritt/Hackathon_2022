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

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}



function getInput(event){
    console.log();
    posX = MouseEvent.clientX;
    posY = MouseEvent.clientY;
    console.log("Mouse X position: " + eve + "\nMouse Y position: " + posY);
}

window.onload = function(){
    document.addEventListener('click', getInput(event));
}