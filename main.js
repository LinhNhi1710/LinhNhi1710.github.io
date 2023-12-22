/*
	Install Node.js.
	npm install --save three
	npm install --save-dev vite
	Run server local : npx vite : http://localhost:5173
*/


import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
	50,
    window.innerWidth / window.innerHeight,
    1,
    10000
	);
camera.position.z = 5;

// Must have light, without scene is black
const light = new THREE.AmbientLight(0xffffff, 3);
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x111100);
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const diffTexture = textureLoader.load( "/textures/christ_tree.png");
const fbxLoader = new FBXLoader();
var treeFbx

fbxLoader.load(
    'models/SM_tree1.FBX',
    (object) => {
    	treeFbx = object;
    	object.traverse( function ( child ) 
    	{
			if ( child.isMesh ) 
			{
				child.material.map = diffTexture;
			}
		});
    //    object.scale.set(1, 1, 1)
        object.position.y = -1
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


function animate() {
	
	if (treeFbx)
	{
	    treeFbx.rotation.y = Date.now()*.001;
	}
	

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
