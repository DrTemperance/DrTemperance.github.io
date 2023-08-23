var from = "home",
  availTime = 120,
  cost;

function go(to) {
  let availLocations = locations[from];
  let index = availLocations.findIndex(
    (possibility) => possibility.locale === to
  );
  if (index != -1) {
    return traverse(locations[from][index]);
  } else if (to == ``) {
    return `You ain't going nowhere.`;
  } else {
    if (from == to) {
      return `You are already there.`;
    } else {
      return `It is not possible to go there from your location.`;
    }
  }
}

function traverse(to) {
  cost = to.timeCost;
  if (availTime >= cost) {
    availTime -= cost;
    from = to.locale;
    return `You walk to ${to.outputname}.`;
  } else {
    return `Not enough time, it takes ${cost} minutes to do that, and you only have ${availTime}.`;
  }
}
