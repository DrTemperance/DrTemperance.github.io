import { positionView } from '../accessors/PositionNode.js';
import { addNodeClass } from '../core/Node.js';
import { smoothstep } from '../math/MathNode.js';
import { addNodeElement, nodeProxy } from '../shadernode/ShaderNode.js';
import FogNode from './FogNode.js';

class FogRangeNode extends FogNode {

	constructor( colorNode, nearNode, farNode ) {

		super( colorNode );

		this.isFogRangeNode = true;

		this.nearNode = nearNode;
		this.farNode = farNode;

	}

	setup() {

		return smoothstep( this.nearNode, this.farNode, positionView.z.negate() );

	}

}

export default FogRangeNode;

export const rangeFog = nodeProxy( FogRangeNode );

addNodeElement( 'rangeFog', rangeFog );

addNodeClass( 'FogRangeNode', FogRangeNode );