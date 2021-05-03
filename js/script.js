
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x:0,
    y:150,
    width:256,
    height:256,
    frameX:0,
    frameY:0,
    speed: 9,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = "images/spritesheet player.png";
const background = new Image();
background.src = "images/background.png";


let offsetx = 0, offsety = 0;

function drawPlayer(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}

function idleStance(){
    if(player.frameX<1024){ 
        player.frameX = player.frameX + player.width;
    }
    else if(player.frameX==1024){ 
        player.frameX = 0;
    }
}
window.setInterval(idleStance,200);

function animate(){
    ctx.drawImage(background, offsetx, offsety, 800, 500, 0, 0, canvas.width, canvas.height);
    drawPlayer(playerSprite, player.frameX, player.frameY, player.height, player.width, player.x, player.y, player.height * 0.75, player.width * 0.75);
    moveBackground();
    movePlayer();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    player.moving = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer(){
    if(keys[39]){
        player.x += player.speed;
        player.frameY = 0;
    }
    else if(keys[37]){
        player.x -= player.speed;
        player.frameY = 256;
    }
}
function moveBackground(){
    if(player.x >= 150 && player.moving == true){
        player.x = 150;
        offsetx += player.speed;
    }
    else if(player.x <= 0 && player.moving == true){
        player.x = 0;
        offsetx -= player.speed;
    }
}
