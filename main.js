import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { initWorld } from "./world.js";
import { initPlayer } from "./player.js";
import { initControls } from "./controls.js";
import { initNetwork } from "./network.js";

export let scene;
export let camera;
export let renderer;

async function init(){

// Scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Camera
camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

// Renderer
renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff,0.6));

const sun = new THREE.DirectionalLight(0xffffff,1);
sun.position.set(100,200,100);
scene.add(sun);

// Systems
await initWorld(scene);
initPlayer(camera);
initControls(camera);
initNetwork();

animate();
}

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);
}

init();

const player = initPlayer(camera);
scene.add(player);
