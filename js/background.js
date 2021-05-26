import { player } from './player.js'
import { keys } from './app.js'

const canvas = document.getElementById("gameScreen");
export const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const backgroundGround = new Image();
backgroundGround.src = "images/background-ground.png";
const backgroundSky  = new Image();
backgroundSky.src = "images/background-sky.png";
const backgroundClouds = new Image();
backgroundClouds.src = "images/background-clouds.png";
const backgroundHints = new Image();
backgroundHints.src = "images/hints.png";

export const background = {
    backgroundGround: {
        offsetx: 0,
        offsety: 0,
    },
    clouds: {
        offsetx: 0
    },
    hints: {
        offsety: 0,
        top: false
    },
    drawMap: function(){
        ctx.drawImage(backgroundSky, 0, 0, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundClouds, background.clouds.offsetx, 0, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundGround, background.backgroundGround.offsetx, background.backgroundGround.offsety, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundHints, background.backgroundGround.offsetx, background.hints.offsety, 800, 500, 0, 0, canvas.width, canvas.height);
        this.moveClouds();
    },
    moveBackground: function(){
        if(player.x >= 750){
            background.backgroundGround.offsetx = background.backgroundGround.offsetx + 800;
            player.x = -30;
            background.clouds.offsetx += 800;
        }
        else if(player.x < -30 && player.absx > 0){
            background.backgroundGround.offsetx = background.backgroundGround.offsetx - 800;
            player.x = 749;
            background.clouds.offsetx -= 800;
        }
    },
    moveClouds: function(){
        background.clouds.offsetx = background.clouds.offsetx + 0.25;
    },
    moveHints: function(){
        
        if(!background.hints.top){
            background.hints.offsety += 1;
            if(background.hints.offsety == 20){
                background.hints.top = true;
            }
        }
        else if(background.hints.top){
            background.hints.offsety -= 1;
            if(background.hints.offsety == -20){
                background.hints.top = false;
            }
        } 
         
    }
}
