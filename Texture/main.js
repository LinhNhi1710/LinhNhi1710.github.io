


import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
let loader = new THREE.TextureLoader();

let dummy = loader.load("/textures/diffuse.png");

let materialArray = [
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
    new THREE.MeshBasicMaterial( { map: loader.load("/textures/diffuse.png") } ),
];

var cube = new THREE.Mesh( cubeGeometry, materialArray );
scene.add(cube);


function rotateCube() {
	// rotate cube
	var SPEED = 0.005;
	cube.rotation.x -= SPEED * 2;
	cube.rotation.y -= SPEED;
	cube.rotation.z -= SPEED * 3;
}

function animate() {
	requestAnimationFrame( animate );
	rotateCube();
	renderer.render( scene, camera );
}
animate();

