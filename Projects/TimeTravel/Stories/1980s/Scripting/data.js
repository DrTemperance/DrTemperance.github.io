// Player Data

let Inventory = {
	Values : { Hairpins: 1, Money: 3 }, Items: {
		Flashlight  : {
			Available: false, condition: { Type: 'battery', Value: 100 }
		}, taser    : {
			Available: true, condition: {
				Type: 'battery', Value: 0
			}
		}, lighter  : {
			Available: true, condition: {
				Type: 'fuel', Value: 80
			}
		}, SharpBone: { Available: false }, LooseCigarette: { Available: false }, Revolver: {
			Available: false, Stashed: false, Condition: {
				Type: 'ammo', Value: 0
			}
		}
	}, Keys: {
		MotelMasterKey: { Available: false }, carKeys: { Available: true }
	}
};
const Locations = {
	gasstation: [
		{
			locale: 'home', outputname: 'your house', requirements: { hasKeys: true }
		}, {
			locale: 'motel', outputname: 'the motel', requirements: { clearedMotel: true }
		}
	], home   : [
		{
			locale: 'gasstation', outputname: 'the gas station', requirements: { onHomeArrest: false }
		}
	], motel  : [
		{
			locale: 'home', outputname: 'your house', requirements: { hasKeys: true }
		}, {
			locale: 'gasstation', outputname: 'the gas station', requirements: { onHomeArrest: false }
		}
	]
};

// Checker Functions

const checkItem      = item => Inventory.Items[item].Available,
      checkCondition = item => Inventory.Items[item].d,
      checkValue     = Value => Inventory.Values[Value],
      checkKeys      = key => Inventory.Keys[key].Available;