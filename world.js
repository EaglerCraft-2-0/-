import { Chunk } from "./chunk.js";

export async function initWorld(scene){

const renderDistance=2;

for(let x=-renderDistance;x<=renderDistance;x++){
for(let z=-renderDistance;z<=renderDistance;z++){

let chunk=new Chunk(x,z);
chunk.generate();
chunk.buildMesh();

scene.add(chunk.mesh);
}}

}
