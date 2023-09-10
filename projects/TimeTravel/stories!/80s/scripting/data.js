const locations = {
         gasstation: [
            {
               locale      : 'home',
               outputname  : 'your house',
               requirements: {hasKeys: true},
            },
            {
               locale      : 'motel',
               outputname  : 'the motel',
               requirements: {clearedMotel: true},
            },
         ],
         home      : [
            {
               locale      : 'gasstation',
               outputname  : 'the gas station',
               requirements: {onHomeArrest: false},
            },
         ],
         motel     : [
            {
               locale      : 'home',
               outputname  : 'your house',
               requirements: {hasKeys: true},
            },
            {
               locale      : 'gasstation',
               outputname  : 'the gas station',
               requirements: {onHomeArrest: false},
            },
         ],
      }
;

const checkItem = item => inventory.items[item].available;
const checkCondition = item => inventory.items[item].d;
const checkValue = value => inventory.values[value];
const checkKeys = key => inventory.keys[key].available;

var inventory = {
   values: {money: 3, hairpins: 1},
   items : {
      flashlight    : {
         available: false,
         condition: {type: 'battery', value: 100},
      },
      taser         : {
         available: true,
         condition: {
            type : 'battery',
            value: 0,
         },
      },
      lighter       : {
         available: true,
         condition: {
            type : 'fuel',
            value: 80,
         },
      },
      sharpBone     : {
         available: false,
      },
      looseCigarette: {
         available: false,
      },
      revolver      : {
         available: false,
         stashed  : false,
         condition: {
            type : 'ammo',
            value: 0,
         },
      },
   },
   keys  : {
      motelMasterKey: {available: false},
      carKeys       : {available: true},
   },
};
