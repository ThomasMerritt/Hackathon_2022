const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
var houseWidth = 200;
var houseHeight = canvas.height;

const enemiesAll = [];
var healthBase = 1000;

function checkHealthBase(){
    if(healthBase <= 0){
        window.close();
    }
}

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

class Enemy {
    constructor(type) {
        //super(x, y);
        this.x = canvas.width;
        this.y = 100;
        this.type = type;
        this.health = 0;
        this.width = 0;
        this.height = 0;
        this.damage = 0;
        this.attackSpeed = 0;
        this.speed = 0;
        this.distanceCap = 0;
        this.setEverything();
    }
    setEverything() {
        switch(this.type){
            case 0:
                //for speedy boy
                this.health = 1;
                this.damage = 20;
                this.attackSpeed = 1000;
                this.speed = -10;
                this.distanceCap = 250;
                this.width = 30;
                this.height = 30;
                this.color = 'green';
                break;
            case 1:
                //for chonk
                this.heath = 10;
                this.damage = 40;
                this.attackSpeed = 3000;
                this.speed = -1;
                this.distanceCap = 500;
                this.width = 300;
                this.height = 75;
                this.color = 'yellow';
                break;
            case 2:
                //for rangey
                this.health = 2;
                this.damage = 20;
                this.attackSpeed = 1000;
                this.speed = -1;
                this.distanceCap = 1100;
                this.width = 30;
                this.height = 30;
                this.color = 'purple';
                break;
            case 3:
                //for noob
                this.health = 1;
                this.damage = 10;
                this.attackSpeed = -2500;
                this.speed = -2;
                this.width = 30;
                this.height = 30;
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
                this.width = 20;
                this.height = 20;
                this.color = 'red';
                break;
        }
    }
    attack(){
        baseHealth-=this.damage;
        checkHealthBase();
    }

    move() {
        if(this.x >= this.distanceCap){
            this.x += this.speed;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
    
}

function checkHealth(){
    for(let i=0; i<enemiesAll.length; ++i){
        if(enemiesAll[i].health <= 0){
            delete enemiesAll[i];
            //blow up and then thomas_death.mp4
        }
    }
}

function detectEnemies(mouseX, mouseY){
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



window.onload = function(){
    document.addEventListener('click', (e) =>{
        console.log("Mouse X position: " + e.clientX + "\nMouse Y position: " + e.clientY);
        detectEnemies(e.clientX, e.clientY);
    });
    playGame();
}

function playGame(){
    window.setInterval(newEnemy, 3000); //Create new enemy every 3 seconds
}

let animationgId;
function animate() {
    animationId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemy.move();
    enemy.draw();
    house.draw();
}

let house = new Block(0, 0);
let enemy = new Enemy(2);
animate();

