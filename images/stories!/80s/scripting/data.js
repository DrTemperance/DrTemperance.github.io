const locations = {
  gasstation: [
    {
      locale: "home",
      timeCost: 33,
      outputname: "your house",
      requirements: { hasKeys: true },
    },
  ],
  home: [
    {
      locale: "gasstation",
      timeCost: 33,
      outputname: "the gas station",
      requirements: { onHomeArrest: false },
    },
  ],
};

function checkItem(item) {
  return inventory.items[item].available;
}

function checkCondition(item) {
  return inventory.items[item].d;
}

function checkValue(value) {
  return inventory.values[value];
}

function checkKeys(key) {
  return inventory.keys[key].available;
}

var inventory = {
  values: { money: 3, hairpins: 1 },
  items: {
    flashlight: {
      available: false,
      condition: { type: "battery", value: 100 },
    },
    taser: {
      available: true,
      condition: {
        type: "battery",
        value: 0,
      },
    },
    lighter: {
      available: true,
      condition: {
        type: "fuel",
        value: 80,
      },
    },
    sharpBone: {
      available: false,
    },
    looseCigarette: {
      available: false,
    },
    revolver: {
      available: false,
      stashed: false,
      condition: {
        type: "ammo",
        value: 0,
      },
    },
  },
  keys: {
    motelMasterKey: { available: false },
    carKeys: { available: true },
  },
};
