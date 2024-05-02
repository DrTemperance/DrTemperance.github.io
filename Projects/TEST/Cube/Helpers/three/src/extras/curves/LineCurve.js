import { Vector2 } from '../../math/Vector2.js';
import { Curve } from '../core/Curve.js';

class LineCurve extends Curve {

	constructor(v1 = new Vector2(), v2 = new Vector2()) {

		super();

		this.isLineCurve = true;

		this.type = 'LineCurve';

		this.v1 = v1;
		this.v2 = v2;

	}

	getTangent(t, optionalTarget = new Vector2()) {

		return optionalTarget.subVectors(this.v2, this.v1).normalize();

	}

	getPoint(t, optionalTarget = new Vector2()) {

		const point = optionalTarget;

		if (t===1) {

			point.copy(this.v2);

		} else {

			point.copy(this.v2).sub(this.v1);
			point.multiplyScalar(t).add(this.v1);

		}

		return point;

	}

	toJSON() {

		const data = super.toJSON();

		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;

	}

	// Line curve is linear, so we can overwrite default getPointAt
	getPointAt(u, optionalTarget) {

		return this.getPoint(u, optionalTarget);

	}

	getTangentAt(u, optionalTarget) {

		return this.getTangent(u, optionalTarget);

	}

	fromJSON(json) {

		super.fromJSON(json);

		this.v1.fromArray(json.v1);
		this.v2.fromArray(json.v2);

		return this;

	}

	copy(source) {

		super.copy(source);

		this.v1.copy(source.v1);
		this.v2.copy(source.v2);

		return this;

	}

}

export { LineCurve };