import { InterleavedBuffer } from './InterleavedBuffer.js';

class InstancedInterleavedBuffer extends InterleavedBuffer {

	constructor(array, stride, meshPerAttribute = 1) {

		super(array, stride);

		this.isInstancedInterleavedBuffer = true;

		this.meshPerAttribute = meshPerAttribute;

	}

	toJSON(data) {

		const json = super.toJSON(data);

		json.isInstancedInterleavedBuffer = true;
		json.meshPerAttribute = this.meshPerAttribute;

		return json;

	}

	clone(data) {

		const ib = super.clone(data);

		ib.meshPerAttribute = this.meshPerAttribute;

		return ib;

	}

	copy(source) {

		super.copy(source);

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	}

}

export { InstancedInterleavedBuffer };