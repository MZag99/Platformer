
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x:0,
    y:0,
    width:64,
    height:64,
    frameX:0,
    frameY:0,
    speed: 9,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = "images/spritesheet player.png";
const background = new Image();
background.src = "images/background.png";

let offsetx = 0, offsety = 150;
let positionx = 0, positiony = 300;

function drawPlayer(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}

function animate(){
    ctx.drawImage(background, offsetx, offsety, 240, 150, 0, 0, canvas.width, canvas.height);
    drawPlayer(playerSprite, 0, 0, player.height, player.width, positionx, positiony, player.height * 2, player.width * 2);
    requestAnimationFrame(animate);
}
animate();



