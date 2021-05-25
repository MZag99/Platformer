import { background, ctx } from './background.js';
import { keys, moveInterval } from './app.js';

export const player = {
    x:0,
    y:100,
    absx:0,
    absy:0,
    width:256,
    height:256,
    frameX:0,
    frameY:0,
    speed: 9,
    moving: false,
    jumping: false,
    stuck: false,

    drawPlayer: function(){
        const playerSprite = new Image();
        playerSprite.src = "images/spritesheet player.png";
        ctx.drawImage(playerSprite, player.frameX, player.frameY, player.height, player.width, player.x, player.y, player.height * 0.75, player.width * 0.75);
        this.collisions();
    },
    idleStance: function(){
        if(player.frameX<1024 && player.moving == false){ 
            player.frameX = player.frameX + player.width;
        }
        else if(player.frameX==1024 && player.moving == false){ 
            player.frameX = 0;
        }
    },
    running: function(){
        if(player.frameX<2304 && player.moving == true){ 
            player.frameX = player.frameX + player.width;
        }
        else if(player.frameX==2304 && player.moving == true){ 
            player.frameX = 0;
        }
    },
    movePlayer: function(){
        if(keys[39]){
            player.frameY = 512;
            if(player.x < (800 - player.width * 0.75 + 40)){
                player.x += player.speed;
                player.absx += player.speed;
            }
        }
        else if(keys[37]){
            player.frameY = 768;
            if(player.x > -30){
                player.x -= player.speed;
                player.absx -= player.speed;
            }
        }
        background.moveBackground();
    },
    collisions: function(){
        if(player.absx >= 1370 && player.absx <= 1800){
            player.y = 185;
            if(player.absx >= 1800 && player.absx <= 1815 && !player.stuck ){
                player.speed = 0
                player.stuck = true;
                player.moving = false;
            }
            else if(keys[37] && player.stuck){
                player.speed = 9;
                player.stuck = false;
                player.moving = true;
            }
            
        }
        else player.y = 100;
    }

}

