const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var houseWidth = 200;
var houseHeight = canvas.height;

const enemiesAll = [];
var maxEnemies = 5;
var healthBase = 1000;
const gameTime = new Date();
var temp = 0;

function checkHealthBase(){
    console.log(healthBase);
    if(healthBase <= 0){
        alert("You died, idiot");
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
        this.y = getRandomInt(0, houseHeight);
        this.type = type;
        this.health = 0;
        this.width = 0;
        this.height = 0;
        this.damage = 0;
        this.attackSpeed = 0;
        this.speed = 0;
        this.distanceCap = 0;
        this.attacking = 0;
        this.setEverything();
    }
    setEverything() {
        switch(this.type){
            case 0:
                //for speedy boy
                this.health = 1;
                this.damage = 20;
                this.attackSpeed = 1000;
                this.speed = -6;
                this.distanceCap = 250;
                this.width = 30;
                this.height = 30;
                this.color = 'green';
                break;
            case 1:
                //for chonk
                this.health = 5;
                this.damage = 80;
                this.attackSpeed = 3000;
                this.speed = -1;
                this.distanceCap = 500;
                this.width = 250;
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
                this.attackSpeed = 2500;
                this.speed = -2;
                this.width = 30;
                this.height = 30;
                this.distanceCap = 300;
                this.color = 'grey';
                break;
            case 4:
                //for glass-cannon
                this.health = 1;
                this.damage = 100;
                this.attackSpeed = 3000;
                this.speed = -3;
                this.distanceCap = 500;
                this.width = 20;
                this.height = 20;
                this.color = 'red';
                break;
        }
    }
    attack(){
        healthBase-=this.damage;
        checkHealthBase();
    }

    move() {
        if(this.x > this.distanceCap){
            this.x += this.speed;
            this.startTime = gameTime.getSeconds();
        }else if(this.x <= this.distanceCap){
            // if(this.counter >= this.attackSpeed){
            //     this.counter++;
            // }else{
            //     this.attack();
            //     this.counter = 0;
            // }
            if(this.attacking == 1){
                return;
            }
            this.attacking = 1;
            setInterval(() => {
                this.attack();
            }, this.attackSpeed);
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
    console.log("reaches here");
    for(let i=0; i<enemiesAll.length; ++i){
        if(enemiesAll[i].health <= 0){
            enemiesAll.splice(i, 1);
        }
    }
}

function detectEnemies(mouseX, mouseY){
    for(let i = 0; i < enemiesAll.length; ++i){
        console.log(i + " Color: " + enemiesAll[i].color + '\n' + ' x-value: ' + enemiesAll[i].x + ' - ' + (enemiesAll[i].x + enemiesAll[i].width) + "\n" + enemiesAll[i].width + '\n' + i + ' y-value: ' + enemiesAll[i].y + ' - ' + (enemiesAll[i].y + enemiesAll[i].height) + "\n" + enemiesAll[i].width);
        if(mouseX <= enemiesAll[i].x + enemiesAll[i].width && mouseX >= enemiesAll[i].x && mouseY <= enemiesAll[i].y + enemiesAll[i].height && mouseY >= enemiesAll[i].y){
            enemiesAll[i].health--;
            console.log(enemiesAll[i].health);
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

function drawEnemies(){
    for(let i = 0; i < enemiesAll.length; ++i){
        enemiesAll[i].draw();
    }
}

function moveEnemies(){
    for(let i = 0; i < enemiesAll.length; ++i){
        enemiesAll[i].move();
    }
}

window.onload = function(){
    document.addEventListener('click', (e) =>{
        var rect = canvas.getBoundingClientRect();
        console.log("Mouse X position: " + e.clientX + "\nMouse Y position: " + e.clientY);
        const clickAudio = new Audio('TristanDeath.mp3');
        clickAudio.play();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        detectEnemies(mouseX, mouseY);
    });
    //playGame();
}

var spawnTimer = 0;
function playGame(){
    //window.setInterval(newEnemy, 3000); //Create new enemy every 3 seconds
    if(spawnTimer == 150){
        if(enemiesAll.length >= maxEnemies){
            return;
        }
        newEnemy();
        spawnTimer = 0;
    }
    else{
        spawnTimer++;
    }
}

let animationgId;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    playGame();
    drawEnemies();
    moveEnemies();
    
    house.draw();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(healthBase, houseWidth / 3, houseHeight / 2);
}

let house = new Block(0, 0);
house.height = houseHeight;
house.width = houseWidth;
animate();