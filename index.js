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
        this.x = 100;
        this.y = 100;
        this.type = type;
        this.health = 0;
        this.damage = 0;
        this.attackSpeed = 0;
        this.speed = 0;
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
                this.speed = -10;
                this.distanceCap = 100;
                this.color = 'green';
                break;
            case 1:
                //for chonk
                this.heath = 10;
                this.damage = 40;
                this.attackSpeed = 3000;
                this.speed = -1;
                this.distanceCap = 100;
                this.width = this.width * 1.5;
                this.height = this.height * 1.5;
                this.color = 'yellow';
                break;
            case 2:
                //for rangey
                this.health = 2;
                this.damage = 20;
                this.attackSpeed = -1000;
                this.speed = -3;
                this.distanceCap = 1000;
                this.color = 'purple';
                break;
            case 3:
                //for noob
                this.health = 1;
                this.damage = 10;
                this.attackSpeed = -2500;
                this.speed = -2;
                this.distanceCap = 25;
                this.color = 'grey';
                
                break;
            case 4:
                //for glass-cannon
                this.health = 1;
                this.damage = 50;
                this.attackSpeed = 3000;
                this.speed = -5;
                this.distanceCap = 25;
                this.color = 'red';
                break;
        }
        this.setEverything();
        this.draw();
    }
    
}

let animationgId;
function animate() {
    animationId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.draw();
}

function checkHealth(){
    for(let i=0; i<enemiesAll.length; ++i){
        if(enemiesAll[i].health <= 0){
            delete enemiesAll[i];
            //blow up and then thomas_death.mp4
        }
    }
}

function detectEnemies(e){
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    for(let i = 0; i < enemiesAll.length; ++i){
        if(mouseX <= enemiesAll[i].x + enemiesAll[i].width && mouseX >= enemiesAll[i].x && mouseY <= enemiesAll[i].y + enemiesAll[i].height && mouseY >= enemiesAll[i].y){
            enemiesAll[i].health--;
            checkHealth();
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

function newEnemy(){
    let type = getRandomInt(0, 5);
    let newEnemy = new Enemy(type);
    enemiesAll.push(newEnemy);
}

function playGame(){
    let newEnemy = window.setInterval(newEnemy, 100); //Create new enemy every 3 seconds
    newEnemy.y = getRandomInt%200;
    newEnemy.x = window.innerWidth;
}

window.onload = function(){
    document.addEventListener('click', (e) =>{
        console.log("Mouse X position: " + e.clientX + "\nMouse Y position: " + e.clientY);
        detectEnemies();
    });
    playGame();
}



let block = new Block(canvas.width / 2, canvas.height / 2);
let enemy = new Enemy(3);
animate();

