import { BufferGeometry } from './BufferGeometry.js';

class InstancedBufferGeometry extends BufferGeometry {

	constructor() {

		super();

		this.isInstancedBufferGeometry = true;

		this.type = 'InstancedBufferGeometry';
		this.instanceCount = Infinity;

	}

	toJSON() {

		const data = super.toJSON();

		data.instanceCount = this.instanceCount;

		data.isInstancedBufferGeometry = true;

		return data;

	}

	copy(source) {

		super.copy(source);

		this.instanceCount = source.instanceCount;

		return this;

	}

}

export { InstancedBufferGeometry };