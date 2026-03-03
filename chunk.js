import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { Perlin } from "./utils/noise.js";

const noise=new Perlin();

export class Chunk{

constructor(cx,cz){
this.cx=cx;
this.cz=cz;
this.size=16;
this.blocks=[];
}

generate(){

for(let x=0;x<this.size;x++){
for(let z=0;z<this.size;z++){

let worldX=this.cx*this.size+x;
let worldZ=this.cz*this.size+z;

let height=Math.floor(
noise.fractal(worldX*0.01,0,worldZ*0.01,5)*20+30
);

for(let y=0;y<height;y++){

if(noise.fractal(worldX*0.05,y*0.05,worldZ*0.05,3)>0.4 && y<height-3)
continue;

let type="stone";
if(y===height-1) type="grass";
else if(y>height-5) type="dirt";

this.blocks.push({x,y,z,type});
}

}}}

buildMesh(){

let group=new THREE.Group();

let materials={
grass:new THREE.MeshStandardMaterial({color:0x55aa55}),
dirt:new THREE.MeshStandardMaterial({color:0x8B4513}),
stone:new THREE.MeshStandardMaterial({color:0x888888})
};

let geo=new THREE.BoxGeometry(1,1,1);

for(let b of this.blocks){

let cube=new THREE.Mesh(geo,materials[b.type]);

cube.position.set(
this.cx*this.size+b.x,
b.y,
this.cz*this.size+b.z
);

group.add(cube);
}

this.mesh=group;
}
}
