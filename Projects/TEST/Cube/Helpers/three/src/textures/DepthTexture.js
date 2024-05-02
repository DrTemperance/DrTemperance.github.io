import { DepthFormat, DepthStencilFormat, NearestFilter, UnsignedInt248Type, UnsignedIntType } from '../constants.js';
import { Texture } from './Texture.js';

class DepthTexture extends Texture {

	constructor(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format) {

		format = format!==undefined ? format : DepthFormat;

		if (format!==DepthFormat && format!==DepthStencilFormat) {

			throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');

		}

		if (type===undefined && format===DepthFormat) type = UnsignedIntType;
		if (type===undefined && format===DepthStencilFormat) type = UnsignedInt248Type;

		super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

		this.isDepthTexture = true;

		this.image = {width, height};

		this.magFilter = magFilter!==undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter!==undefined ? minFilter : NearestFilter;

		this.flipY = false;
		this.generateMipmaps = false;

		this.compareFunction = null;

	}

	toJSON(meta) {

		const data = super.toJSON(meta);

		if (this.compareFunction!==null) data.compareFunction = this.compareFunction;

		return data;

	}

	copy(source) {

		super.copy(source);

		this.compareFunction = source.compareFunction;

		return this;

	}

}

export { DepthTexture };