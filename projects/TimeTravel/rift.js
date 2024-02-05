document.getElementById('starterText').outerHTML
	= '<p id="starterText">\n    The game is divided into 3 decades: the 2000s, 1990s, and 1980s.<br><br>\n    2000s: <br> Experience the exhilaration and angst of high school in Gresham, Oregon, during the era of Y2K. As\n    summer break approaches, romance starts to blossom. But are you ready for it?<br><br>\n    1990s: <br> Alone in the heart of Motor City (Detroit, Michigan) during the grunge-infused 90s, your parents are\n    late to return home from their night out, and you notice some strange changes around your house. With each passing\n    minute, your home feels more and more like a labyrinth. Can you get to the bottom of this before you lose your mind?<br><br>\n    1980s: <br> Navigate the thrilling, neon-lit roads of Ruth, Nevada, during the big-hair 80s. You get a call from\n    your best friend Roxanne to pick her up from her boyfriend\'s band party; while you pass through this ghost town, a\n    mysterious follower enters your rearview mirror. What intentions do they hold as they shadow your\n    journey?<br><br><br>\n    Choose wisely, as this cannot be changed later.</p>'
let type = 'Unchosen', level = 0;

const ConsolePhase1 = input =>
  {
	 endFunction(input);

	 if (level===0) {
		const eras     = [`2000s`, `1990s`, `1980s`], eraMessages = {
		  '2000s': 'Oops! It seems like you\'re a time traveler ahead of schedule. The 2000s aren\'t ready for exploration just yet. Patience!',
		  '1990s': 'Hold up, player! Hannah hasn\'t quite calibrated the time machine to the \'90s yet. Your grungey adventure is still in the oven. Keep waiting!',
		  '1980s': 'Whoa, there! The neon lights haven\'t flickered to life for now. Keep your cassette tapes on pause; your adventure is being prepared!'
		}, selectedEra = eras.find(n => input===n);
		if (selectedEra) {
		  endFunction(eraMessages[selectedEra], true, true, true);
		  document.getElementById('starterText').remove();

		  initializeDecade();
		} else {endFunction('I don\'t understand, try again.', true, false, true)}
	 }
  };

const endFunction = (output, isConsole, isProgressive, isImportant) =>
  {
	 if (isConsole) {
		isProgressive && level++;
		ConsolePhase2(document.createTextNode(output), isImportant, !1);
	 } else {
		setPrompt();
		ConsolePhase2(document.createTextNode(`${config.custom.prompt} ${output}`), !1, !1)
	 }
  };

function ConsolePhase2 (output, isBold, isItalics) {
  const AdvOutputLine = document.createElement('p');
  AdvOutputLine.classList.add('OutputLine'), AdvOutputLine.textContent = output;

  isBold && (AdvOutputLine.style.fontWeight = 'bold'), isItalics && (AdvOutputLine.style.fontStyle = 'italic');

  document.getElementById('ConsoleOutput').insertAdjacentElement('afterend', document.createElement('li').appendChild(AdvOutputLine))
}