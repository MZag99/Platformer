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
    
    window.addEventListener('keydown', function(e){
        keys[e.keyCode] = true;
        console.log(keys);
        if(keys[39] || keys[37]){
            player.moving = true;    
        }
        else if(keys[38] || (keys[38] && (keys[39] || keys[37]))){
            player.jumping = true;
        }
    });
    window.addEventListener('keyup', function(e){
        if(keys[39] || keys[37] || keys[38]){
            delete keys[e.keyCode];
            player.moving = false;
            player.frameY = 0;
            player.frameX = 0;
            console.log('player.absx: ',player.absx);
            console.log('player.x: ', player.x)
        }
    });
}
window.setInterval(player.idleStance,200);
window.setInterval(background.moveHints, 30);
window.setInterval(player.movePlayer,15);
window.setInterval(player.jumpPlayer,5);
window.setInterval(player.running,100);
initEventListeners();

