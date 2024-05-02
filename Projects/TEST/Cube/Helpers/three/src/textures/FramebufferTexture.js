import { NearestFilter } from '../constants.js';
import { Texture } from './Texture.js';

class FramebufferTexture extends Texture {

	constructor(width, height) {

		super({width, height});

		this.isFramebufferTexture = true;

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.generateMipmaps = false;

		this.needsUpdate = true;

	}

}

export { FramebufferTexture };