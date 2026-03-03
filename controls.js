import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function initControls(camera){

document.body.addEventListener("click",()=>{
document.body.requestPointerLock();
});

let pitch = 0;
let yaw = 0;

let keys={};

document.addEventListener("keydown",e=>{
keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup",e=>{
keys[e.key.toLowerCase()] = false;
});

document.addEventListener("mousemove",e=>{
if(document.pointerLockElement===document.body){

yaw -= e.movementX * 0.002;
pitch -= e.movementY * 0.002;

// Clamp vertical rotation
pitch = Math.max(-Math.PI/2+0.01,
                 Math.min(Math.PI/2-0.01,pitch));

// Quaternion rotation (correct FPS camera)
camera.quaternion.setFromEuler(
new THREE.Euler(pitch,yaw,0,"YXZ")
);
}
});

function movement(){

const speed = 0.3;

// Forward vector
let dir = new THREE.Vector3();
camera.getWorldDirection(dir);
dir.y = 0;
dir.normalize();

// Right vector
let right = new THREE.Vector3();
right.crossVectors(dir,new THREE.Vector3(0,1,0)).normalize();

if(keys["w"]) camera.position.addScaledVector(dir,speed);
if(keys["s"]) camera.position.addScaledVector(dir,-speed);
if(keys["a"]) camera.position.addScaledVector(right,speed);
if(keys["d"]) camera.position.addScaledVector(right,-speed);

requestAnimationFrame(movement);
}

movement();
}
