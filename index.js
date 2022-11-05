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

let animationgId;
function animate() {
    animationId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.draw();
}

function getInput(e){
    console.log();
    posX = MouseEvent.clientX;
    posY = MouseEvent.clientY;
    console.log("Mouse X position: " + e.clientX + "\nMouse Y position: " + e.clientY);
}

window.onload = function(){
    e = MouseEvent('mousedown');
    document.addEventListener('click', getInput(e));
}



let block = new Block(canvas.width / 2 - 475, canvas.height / 2 + 255, 10, 10, 'red');

