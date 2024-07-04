// ~ Variable Sector ~ //
import * as THREE from "./Helpers/three/build/three.module.js";

const innerWidth  = window.innerWidth,
      innerHeight = window.innerHeight,
      Pi          = Math.PI,
      Tau         = Math.PI * 2;

const Scene    = new THREE.Scene(),
      Viewport = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000),
      Renderer = new THREE.WebGLRenderer({antialias: true, canvas: document.getElementById("canvas")}),
      Lighting = new THREE.HemisphereLight(0xAA55AA, 0xAAAAAA, 0.9),
      Mesh     = new THREE.Mesh(
	       new THREE.BoxGeometry(3.5, 3.5, 3.5),
	       new THREE.MeshLambertMaterial({color: 0xFF6050})
      );

Mesh.castShadow = Mesh.receiveShadow = true;


// Initialization //
Renderer.setSize(innerWidth, innerHeight);

Lighting.position.set(0, 5, 0);
Viewport.position.set(1, 0, 5);

Scene.add(Lighting).add(Mesh);

Renderer.setClearColor(0x111111);

// Render Loop //
setInterval(()=>{
	Viewport.updateProjectionMatrix();
	Viewport.lookAt(Mesh.position);
	Renderer.render(Scene, Viewport);
});

// ~ Animation Sector ~ //

let Animating = false,
    AnimStart = null,
    AnmProg,
    Pre_Rotation;

document.addEventListener('keydown', async ({key})=>{
	if (!Animating && (key=='w' || key=='a' || key=='s' || key=='d')) {
		AnimStart = null;
		Animating = true;
		switch (key) {
			case 'w':
				Pre_Rotation = Mesh.rotation.x;

				const AnimateUp = async time=>{
					if (AnimStart===null) AnimStart = time;
					AnmProg = (time - AnimStart) / 500;
					Mesh.rotation.x = Pre_Rotation + (Pi / 2 - Pre_Rotation) * AnmProg;

					if (AnmProg<1) requestAnimationFrame(AnimateUp);
					else {
						Mesh.rotation.x = Pi / 2;
						Animating = false;
					}
				};

				requestAnimationFrame(AnimateUp);
				break;
			case 's':
				Pre_Rotation = Mesh.rotation.x;

				const AnimateDown = async time=>{
					if (AnimStart===null) AnimStart = time;
					AnmProg = (time - AnimStart) / 500;
					Mesh.rotation.x = Pre_Rotation - Pre_Rotation * AnmProg;

					if (AnmProg<1) requestAnimationFrame(AnimateDown);
					else {
						Mesh.rotation.x = 0;
						Animating = false;
					}
				};

				requestAnimationFrame(AnimateDown);
				break;
			case 'a' :
				Pre_Rotation = Mesh.rotation.y;

				const AnimateWest = async time=>{
					if (AnimStart===null) AnimStart = time;
					AnmProg = (time - AnimStart) / 500;
					Mesh.rotation.y = Pre_Rotation + (Pi / 2 - Pre_Rotation) * AnmProg;

					if (AnmProg<1) requestAnimationFrame(AnimateWest);
					else {
						Mesh.rotation.y = Pi / 2;
						Animating = false;
					}
				};

				requestAnimationFrame(AnimateWest);
				break;
			case 'd' :
				Pre_Rotation = Mesh.rotation.y;

				const AnimateEast = async time=>{
					if (AnimStart===null) AnimStart = time;
					AnmProg = (time - AnimStart) / 500;
					Mesh.rotation.y = Pre_Rotation - Pre_Rotation * AnmProg;

					if (AnmProg<1) requestAnimationFrame(AnimateEast);
					else {
						Mesh.rotation.y = 0;
						Animating = false;
					}
				};
				requestAnimationFrame(AnimateEast);
				break;
			default:
				console.log(`Unknown Key: ${key}}`);
				break;
		}
	}
});