import { background, ctx } from './background.js';
import { keys } from './app.js';

export const player = {
    x:0,
    y:100,
    absx:0,
    absy:0,
    width:256,
    height:256,
    frameX:0,
    frameY:0,
    speed: 2,
    moving: false,
    jumping: false,
    stuck: {
        right: false,
        left: false,
    },
    type: 'z',
    top: false,
    fallen: false,

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
            if(player.stuck.right){
                player.frameY = 512;
            }
            else if(player.stuck.left){
                player.frameY = 768;
            } 
            player.frameX = player.frameX + player.width;
        }
        else if(player.frameX==2304 && player.moving){ 
            player.frameX = 0;
        }
    },
    movePlayer: function(){
        if(keys[39] && !(keys[37] && keys[39]) && player.absx < 15400 && !player.stuck.right){
            player.frameY = 512;
                player.x += player.speed;
                player.absx += player.speed;
        }
        else if(keys[37] && !(keys[39] && keys[37]) && player.absx > 0 && !player.stuck.left){
            player.frameY = 768;
                player.x -= player.speed;
                player.absx -= player.speed;
        }
        background.moveBackground();
    },
    jumpPlayer: function(){
        if(player.jumping && !player.top){
            console.log('player.y: ', player.y);
            player.y -= 2;
            if(!player.fallen && player.y == 0){
                player.top = true;
            }
            else if(player.fallen && player.y == 85){
                player.top = true;
            }
        }
        else if(player.top){
            player.y += 2;
            if(!player.fallen && player.y == 100){
                player.jumping = false;
                player.top = false;
            }
            else if(player.fallen && player.y == 185){
                player.jumping = false;
                player.top = false;
            }
        }
    },
    collisions: function(){
        if(player.absx >= 1700 && player.absx <= 2060){
            if(!player.fallen){
                player.y += 85;
                player.fallen = true;
            }
            if(player.absx <= 2060 && player.absx >= 2050 && player.fallen && !player.jumping){
                player.stuck.right = true;
            }
            else player.stuck.right = false;
            if(player.absx >= 1695 && player.absx <= 1716 && player.fallen && !player.jumping){
                player.stuck.left = true;
            }
            else player.stuck.left = false;
        }
        else if((player.absx < 1700 || player.absx > 2000) && player.fallen){
            player.y -= 85;
            player.fallen = false; 
        }
    }

}

