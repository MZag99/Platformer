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
    drawMap: function(){
        ctx.drawImage(backgroundSky, 0, 0, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundClouds, background.clouds.offsetx, 0, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundGround, background.backgroundGround.offsetx, background.backgroundGround.offsety, 800, 500, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundHints, background.backgroundGround.offsetx + 50, 0, 800, 500, 0, 0, canvas.width, canvas.height);
        this.moveClouds();
    },
    moveBackground: function(){
        if(player.x >= 150 && player.moving == true && background.backgroundGround.offsetx < 15190){
            player.x = 150;
            background.backgroundGround.offsetx += player.speed;
        }
        else if(player.x <= 0 && player.moving == true && background.backgroundGround.offsetx > 0){
            player.x = 0;
            background.backgroundGround.offsetx -= player.speed;
        }
    },
    moveClouds: function(){

        if(!player.moving || player.x < 0 || player.stuck)
            background.clouds.offsetx = background.clouds.offsetx + 0.25;
        else if(player.moving && keys[39] && !player.stuck)
            background.clouds.offsetx = background.clouds.offsetx + 0.75;
        else if(player.moving && keys[37] && player.x >= 0)
            background.clouds.offsetx = background.clouds.offsetx + 0.125;
    }
}
