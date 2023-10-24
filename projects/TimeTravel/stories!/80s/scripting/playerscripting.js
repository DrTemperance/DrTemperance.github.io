let from = 'home';

const go = to => {
  let availLocations = locations[from];
  let index = availLocations.findIndex(possibility => possibility.locale===to);

  const travels = (from,to) => from.locale[to];

  if (index!== -1) {return `You walk to ${to.outputname}.`}
  if (to==='') {return 'You ain\'t going nowhere.'}
  if (from===to) {return 'You are already there.'}
  if (!travels(from,to)) {return 'It is not possible to go there from your location.'}
};