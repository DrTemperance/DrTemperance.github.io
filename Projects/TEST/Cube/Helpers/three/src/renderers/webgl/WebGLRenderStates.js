import { WebGLLights } from './WebGLLights.js';

function WebGLRenderState(extensions, capabilities) {

	const lights = new WebGLLights(extensions, capabilities);

	const lightsArray = [];
	const shadowsArray = [];

	function init() {

		lightsArray.length = 0;
		shadowsArray.length = 0;

	}

	function pushLight(light) {

		lightsArray.push(light);

	}

	function pushShadow(shadowLight) {

		shadowsArray.push(shadowLight);

	}

	function setupLights(useLegacyLights) {

		lights.setup(lightsArray, useLegacyLights);

	}

	function setupLightsView(camera) {

		lights.setupView(lightsArray, camera);

	}

	const state = {
		lightsArray,
		shadowsArray,

		lights
	};

	return {
		init,
		state,
		setupLights,
		setupLightsView,

		pushLight,
		pushShadow
	};

}

function WebGLRenderStates(extensions, capabilities) {

	let renderStates = new WeakMap();

	function get(scene, renderCallDepth = 0) {

		const renderStateArray = renderStates.get(scene);
		let renderState;

		if (renderStateArray===undefined) {

			renderState = new WebGLRenderState(extensions, capabilities);
			renderStates.set(scene, [renderState]);

		} else {

			if (renderCallDepth>=renderStateArray.length) {

				renderState = new WebGLRenderState(extensions, capabilities);
				renderStateArray.push(renderState);

			} else {

				renderState = renderStateArray[renderCallDepth];

			}

		}

		return renderState;

	}

	function dispose() {

		renderStates = new WeakMap();

	}

	return {
		get,
		dispose
	};

}


export { WebGLRenderStates };