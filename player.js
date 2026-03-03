export function initPlayer(camera){

    camera.position.set(0,40,0);

    let velocityY = 0;
    const gravity = -0.02;

    function update(){

        velocityY += gravity;
        camera.position.y += velocityY;

        if(camera.position.y < 30){
            camera.position.y = 30;
            velocityY = 0;
        }

        requestAnimationFrame(update);
    }

    update();
}
