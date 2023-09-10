var from = 'home';

function go(to) {
   let availLocations = locations[from];
   let index = availLocations.findIndex(
      (possibility) => possibility.locale === to,
   );
   if (index !== -1) {
      return `You walk to ${to.outputname}.`;
   } else if (to === ``) {
      return `You ain't going nowhere.`;
   } else {
      if (from === to) {
         return `You are already there.`;
      } else {
         return `It is not possible to go there from your location.`;
      }
   }
}