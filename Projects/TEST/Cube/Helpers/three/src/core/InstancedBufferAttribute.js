import { BufferAttribute } from './BufferAttribute.js';

class InstancedBufferAttribute extends BufferAttribute {

	constructor(array, itemSize, normalized, meshPerAttribute = 1) {

		super(array, itemSize, normalized);

		this.isInstancedBufferAttribute = true;

		this.meshPerAttribute = meshPerAttribute;

	}

	toJSON() {

		const data = super.toJSON();

		data.meshPerAttribute = this.meshPerAttribute;

		data.isInstancedBufferAttribute = true;

		return data;

	}

	copy(source) {

		super.copy(source);

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	}

}

export { InstancedBufferAttribute };