import { LineBasicMaterial } from 'three';
import NodeMaterial, { addNodeMaterial } from './NodeMaterial.js';

const defaultValues = new LineBasicMaterial();

class LineBasicNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isLineBasicNodeMaterial = true;

		this.lights = false;
		this.normals = false;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

}

export default LineBasicNodeMaterial;

addNodeMaterial( 'LineBasicNodeMaterial', LineBasicNodeMaterial );