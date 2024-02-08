let Source = 'home';

function go(Destination) {
	let Available_Locations = Locations[Source];
	let Index = Available_Locations.findIndex(Possibility => Possibility.locale===Destination);

	const travels = (Source, Destination) => Source.locale[Destination];

	if (Index!== -1) {return `You walk to ${Destination.outputname}.`}
	if (Destination==='') {return "You ain't going nowhere."}
	if (Source===Destination) {return "You are already there."}
	if (!travels(Source, Destination)) {return "It is not possible to go there from your location."}
}