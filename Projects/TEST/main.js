import * as THREE from "./three/build/three.module.js";

const Scene             = new THREE.Scene(),
      perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
      Renderer          = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("canvas") });

let Animating = false,
    AnimStart = null;

let Pre_Rotation;

Renderer.setSize(window.innerWidth, window.innerHeight);

const Geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5), Material = new THREE.MeshLambertMaterial({ color: 0xFFA050 }), Mesh = new THREE.Mesh(Geometry, Material);

document.body.appendChild(Renderer.domElement);

const StartScene = async () => {
	let SceneLighting = await new THREE.HemisphereLight(0xAA55AA);
	Scene.add(SceneLighting)
	     .add(Mesh);
	SceneLighting.position.set(0, 5, 0);

	perspectiveCamera.position.set(1, 0, 5);
	Mesh.castShadow = true;
	Mesh.receiveShadow = true;

	Renderer.setClearColor(0x111111);
};

const animate = async () => {
	perspectiveCamera.updateProjectionMatrix();
	requestAnimationFrame(animate);

	perspectiveCamera.lookAt(Mesh.position);


	Renderer.render(Scene, perspectiveCamera);
};

animate();
StartScene();

document.addEventListener('keydown', async ({ key }) => {
	if (!Animating) {
		switch (key) {
			case 'w':
				Animating = true;
				AnimStart = null;
				Pre_Rotation = Mesh.rotation.x;

				const AnimateUp = async time => {
					if (AnimStart===null) AnimStart = time;
					const progress = (time - AnimStart) / 500;
					Mesh.rotation.x = Pre_Rotation + (Math.PI / 2 - Pre_Rotation) * progress;

					if (progress<1) requestAnimationFrame(AnimateUp);
					else Mesh.rotation.x = Math.PI / 2, Animating = false;
				};

				requestAnimationFrame(AnimateUp);
				break;
			case 's':
				Animating = true;
				AnimStart = null;
				Pre_Rotation = Mesh.rotation.x;

				const AnimateDown = async time => {
					if (AnimStart===null) AnimStart = time;
					const progress = (time - AnimStart) / 500;
					Mesh.rotation.x = Pre_Rotation - (Pre_Rotation) * progress;

					if (progress<1) requestAnimationFrame(AnimateDown);
					else Mesh.rotation.x = 0, Animating = false;
				};

				requestAnimationFrame(AnimateDown);
				break;
			case 'a' :
				Animating = true;
				AnimStart = null;
				Pre_Rotation = Mesh.rotation.y;

				const AnimateWest = async time => {
					if (AnimStart===null) AnimStart = time;
					const progress = (time - AnimStart) / 500;
					Mesh.rotation.y = Pre_Rotation + (Math.PI / 2 - Pre_Rotation) * progress;

					if (progress<1) requestAnimationFrame(AnimateWest);
					else Mesh.rotation.y = Math.PI / 2, Animating = false;
				};

				requestAnimationFrame(AnimateWest);
				break;
			case 'd' :
				Animating = true;
				AnimStart = null;
				Pre_Rotation = Mesh.rotation.y;

				const AnimateEast = async time => {
					if (AnimStart===null) AnimStart = time;
					const progress = (time - AnimStart) / 500;
					Mesh.rotation.y = Pre_Rotation - (Pre_Rotation) * progress;

					if (progress<1) requestAnimationFrame(AnimateEast);
					else Mesh.rotation.y = 0, Animating = false;
				};

				requestAnimationFrame(AnimateEast);
				break;
		}
	}
});