import { background } from "./background.js";
import { player } from "./player.js";

export const keys = [];

function animate() {
    const thisApp = this;

    background.drawMap();
    player.drawPlayer();
    requestAnimationFrame(animate);
}
animate();

function initEventListeners(){
    let fired = false;
    const runInterval = window.setInterval(player.running,100);
    const moveInterval = window.setInterval(player.movePlayer,15);
    const cloudInterval = window.setInterval(background.moveClouds,60);

    window.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
        if(!fired && (keys[39] == true || keys[37] == true)){
            fired = true;
            player.moving = true;
            runInterval;    
            moveInterval;    
        }
    });
    window.addEventListener("keyup", function(e){
        if(keys[39] == true || keys[37] == true){
            fired = false;
            delete keys[e.keyCode];
            player.moving = false;
            player.frameY = 0;
            player.frameX = 0;
        }
    });
}
initEventListeners();
window.setInterval(player.idleStance,200);


