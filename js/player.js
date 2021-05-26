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
    type: 'z',

    drawPlayer: function(){
        const playerSprite = new Image();
        playerSprite.src = "images/spritesheet player.png";
        ctx.drawImage(playerSprite, player.frameX, player.frameY, player.height, player.width, player.x, player.y, player.height * 0.75, player.width * 0.75);
        this.collisions();
    },
    idleStance: function(){
        if(player.frameX<1024 && !player.moving){ 
            player.frameX = player.frameX + player.width;
        }
        else if(player.frameX==1024 && !player.moving){ 
            player.frameX = 0;
        }
    },
    running: function(){
        if(player.frameX<2304 && player.moving){ 
            player.frameX = player.frameX + player.width;
        }
        else if(player.frameX==2304 && player.moving){ 
            player.frameX = 0;
        }
    },
    movePlayer: function(){
        if(keys[39] && !(keys[37] && keys[39]) && player.absx < 15400){
            player.frameY = 512;
                player.x += player.speed;
                player.absx += player.speed;
        }
        else if(keys[37] && !(keys[39] && keys[37]) && player.absx > 0){
            player.frameY = 768;
                player.x -= player.speed;
                player.absx -= player.speed;
        }
        background.moveBackground();
    },
    collisions: function(){
        if(player.absx >= 1690 && player.absx <= 2060){
            player.y = 185;
        }
        else player.y = 100;
    }

}

