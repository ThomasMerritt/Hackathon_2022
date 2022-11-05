const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const enemiesAll = [];

class Block {
    constructor(x, y) {
        this.width = 200;
        this.height = 200;
        this.color = 'black';
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

class Enemy extends Block {
    constructor(type) {
        super(x, y);
        this.type = type;
        this.health = 0;
        this.damage = 0;
        this.attackSpeed = 0;
        this.xspeed = 0;
        this.maxspeed = 0;
        this.distanceCap = 0;
        this.setEverything();
    }
    setEverything() {
        t = this.type;
        switch(t){
            case 0:
                //for speedy boy
                this.health = 1;
                this.damage = 20;
                this.attackSpeed = 1000;
                this.maxspeed = -999;
                this.distanceCap = 100;
                break;
            case 1:
                //for chonk
                this.heath = 20;
                this.damage = 40;
                this.attackSpeed = 3000;
                this.maxspeed = -1;
                this.distanceCap = 100;
                this.width = this.width * 1.5;
                this.height = this.height * 1.5;
                break;
            case 2:
                //for rangey
                this.health = 2;
                this.damage = 20;
                this.attackSpeed = -1000;
                this.maxspeed = 3;
                this.distanceCap = 1000;
                break;
            case 3:
                //for noob
                this.health = 1;
                this.damage = 10;
                this.attackSpeed = -2500;
                this.maxspeed = -2;
                this.distanceCap = 25;
                
                break;
            case 4:
                //for glass-cannon
                this.health = 1;
                this.damage = 50;
                this.attackSpeed = 3000;
                this.maxspeed = -5;
                this.distanceCap = 25;
                break;
        }
        this.draw();
    }
    
}

let animationgId;
function animate() {
    animationId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.draw();
}

function detectEnemies(){

}

window.onload = function(){
    document.addEventListener('click', (e) =>{
        console.log("Mouse X position: " + e.clientX + "\nMouse Y position: " + e.clientY);
        detectEnemies();
    });
}



let block = new Block(canvas.width / 2, canvas.height / 2, 10, 10, 'red');
animate();

