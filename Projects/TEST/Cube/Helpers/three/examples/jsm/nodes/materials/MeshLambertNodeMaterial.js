import { MeshLambertMaterial } from 'three';
import PhongLightingModel from '../functions/PhongLightingModel.js';
import NodeMaterial, { addNodeMaterial } from './NodeMaterial.js';

const defaultValues = new MeshLambertMaterial();

class MeshLambertNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshLambertNodeMaterial = true;

		this.lights = true;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

	setupLightingModel( /*builder*/ ) {

		return new PhongLightingModel( false ); // ( specular ) -> force lambert

	}

}

export default MeshLambertNodeMaterial;

addNodeMaterial( 'MeshLambertNodeMaterial', MeshLambertNodeMaterial );