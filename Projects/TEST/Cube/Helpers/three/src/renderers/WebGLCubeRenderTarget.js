import { CubeCamera } from '../cameras/CubeCamera.js';
import { BackSide, LinearFilter, LinearMipmapLinearFilter, NoBlending, NoColorSpace, SRGBColorSpace, sRGBEncoding } from '../constants.js';
import { BoxGeometry } from '../geometries/BoxGeometry.js';
import { ShaderMaterial } from '../materials/ShaderMaterial.js';
import { Mesh } from '../objects/Mesh.js';
import { CubeTexture } from '../textures/CubeTexture.js';
import { warnOnce } from '../utils.js';
import { cloneUniforms } from './shaders/UniformsUtils.js';
import { WebGLRenderTarget } from './WebGLRenderTarget.js';

class WebGLCubeRenderTarget extends WebGLRenderTarget {

	constructor(size = 1, options = {}) {

		super(size, size, options);

		this.isWebGLCubeRenderTarget = true;

		const image = {width: size, height: size, depth: 1};
		const images = [image, image, image, image, image, image];

		if (options.encoding!==undefined) {

			// @deprecated, r152
			warnOnce('THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.');
			options.colorSpace = options.encoding===sRGBEncoding ? SRGBColorSpace : NoColorSpace;

		}

		this.texture = new CubeTexture(images, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.colorSpace);

		// By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by WebGL (and three.js)
		// in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
		// in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.

		// three.js uses a right-handed coordinate system. So environment maps used in three.js appear to have px and nx swapped
		// and the flag isRenderTargetTexture controls this conversion. The flip is not required when using WebGLCubeRenderTarget.texture
		// as a cube texture (this is detected when isRenderTargetTexture is set to true for cube textures).

		this.texture.isRenderTargetTexture = true;

		this.texture.generateMipmaps = options.generateMipmaps!==undefined ? options.generateMipmaps : false;
		this.texture.minFilter = options.minFilter!==undefined ? options.minFilter : LinearFilter;

	}

	fromEquirectangularTexture(renderer, texture) {

		this.texture.type = texture.type;
		this.texture.colorSpace = texture.colorSpace;

		this.texture.generateMipmaps = texture.generateMipmaps;
		this.texture.minFilter = texture.minFilter;
		this.texture.magFilter = texture.magFilter;

		const shader = {

			uniforms: {
				tEquirect: {value: null}
			},

			vertexShader: /* glsl */`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,

			fragmentShader: /* glsl */`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
		};

		const geometry = new BoxGeometry(5, 5, 5);

		const material = new ShaderMaterial({

			                                    name: 'CubemapFromEquirect',

			                                    uniforms      : cloneUniforms(shader.uniforms),
			                                    vertexShader  : shader.vertexShader,
			                                    fragmentShader: shader.fragmentShader,
			                                    side          : BackSide,
			                                    blending      : NoBlending

		                                    });

		material.uniforms.tEquirect.value = texture;

		const mesh = new Mesh(geometry, material);

		const currentMinFilter = texture.minFilter;

		// Avoid blurred poles
		if (texture.minFilter===LinearMipmapLinearFilter) texture.minFilter = LinearFilter;

		const camera = new CubeCamera(1, 10, this);
		camera.update(renderer, mesh);

		texture.minFilter = currentMinFilter;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	}

	clear(renderer, color, depth, stencil) {

		const currentRenderTarget = renderer.getRenderTarget();

		for (let i = 0; i<6; i++) {

			renderer.setRenderTarget(this, i);

			renderer.clear(color, depth, stencil);

		}

		renderer.setRenderTarget(currentRenderTarget);

	}

}

export { WebGLCubeRenderTarget };