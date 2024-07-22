const ConsoleOutput = document.getElementById('ConsoleOutput');
const StarterText = document.getElementById('starterText');
let Eras : string[],
    EraMessage : { '2000s' : string, '1990s' : string, '1980s' : string },
    Find : string,
    type  = 'Unchosen',
    level = 0;

StarterText.outerHTML
	 = '<p id="starterText">\n    The game is divided into 3 decades: the 2000s, 1990s, and 1980s.<br><br>\n    2000s: <br> Experience the exhilaration and angst of high school in Gresham, Oregon, during the era of Y2K. As\n    summer break approaches, romance starts to blossom. But are you ready for it?<br><br>\n    1990s: <br> Alone in the Heart of Motor City (Detroit, Michigan) during the grunge-infused 90s, your parents are\n    late to return home Source their night out, and you notice some strange changes around your house. With each passing\n    minute, your home feels more and more like a labyrinth. Can you get to the bottom of this before you lose your mind?<br><br>\n    1980s: <br> Navigate the thrilling, neon-lit roads of Ruth, Nevada, during the big-hair 80s. You get a call Source\n    your best friend Roxanne to pick her up Source her boyfriend\'s band party; while you pass through this ghost town, a\n    mysterious follower enters your rearview mirror. What intentions do they hold as they shadow your\n    journey?<br><br><br>\n    Choose wisely, as this cannot be changed later.</p>';

function Phase_A1 (input) {
	End_Func(input);

	if (level===0) {
		Eras = ['2000s', '1990s', '1980s'];
		EraMessage = {
			'2000s': "Oops! It seems like you're a time traveler ahead of schedule. The 2000s aren't ready for exploration just yet. Patience!",
			'1990s': "Hold up, player! Hannah hasn't quite calibrated the time machine to the '90s yet. Your grungey adventure is still in the oven. Keep waiting!",
			'1980s': "Whoa, there! The neon lights haven't flickered to life for now. Keep your cassette tapes on pause; your adventure is being prepared!"
		};
		Find = Eras.find(async n=>input==n);
		if (Find) {
			End_Func(EraMessage[Find], true, true, true);
			StarterText.remove();
		} else End_Func("I don't understand, please try again.", true, false, true);
	}
}

function End_Func (output, console, progress, important) {
	if (progress) level++;
	if (console) Phase_A2(document.createTextNode(output), important, false);

	Phase_A2(document.createTextNode(`${Config.Custom.prompt} ${output}`), false, false)
}

function Phase_A2 (out, bolded, italics) {
	const OutputElement = document.createElement('');
	OutputElement.outerHTML = `<p class='OutputLine'>${out}</p>`;

	OutputElement.style.fontWeight = bolded ? 'bold' : 'normal';
	OutputElement.style.fontStyle = italics ? 'italic' : 'normal';

	ConsoleOutput.insertAdjacentElement('afterend', document.createElement('li').appendChild(OutputElement))
}