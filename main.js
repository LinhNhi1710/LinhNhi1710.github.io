import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.TextureLoader().load("/anh.png");

//donut
const torusGeo = new THREE.CylinderGeometry(600,600,800,40,10);
const meshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xF5986E,
    wireframe: true,
    wireframeLinewidth: 2
});
const torusMesh = new THREE.Mesh(torusGeo, meshBasicMaterial);
torusMesh.position.set(25, 0, 40);

//sophia
const sphGeo = new THREE.SphereGeometry(20, 8, 6)
const basicMaterial = new THREE.MeshNormalMaterial({
    color: 0xF5986E
});
const sphMesh = new THREE.Mesh(sphGeo, basicMaterial);

//
const cubeGeo = new THREE.BoxGeometry(20,20,20);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xF5986E,
});

const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
cubeMesh.position.set(-30, 2, 30);

const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 15, 50);



scene.add(torusMesh, sphMesh, cubeMesh)
camera.position.z = 70;

function animate() {
	requestAnimationFrame( animate );

	torusMesh.rotation.x += 0.02;
	torusMesh.rotation.y += 0.02;

    sphMesh.rotation.y += 0.05;
    sphMesh.rotation.z += 0.05;

    cubeMesh.rotation.x += 0.02;
    cubeMesh.rotation.z += 0.02;

	renderer.render( scene, camera );
}

animate();