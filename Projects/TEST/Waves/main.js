let Comp   = {Sin: false, Cos: false, Tan: false, Sec: false, Csc: false, Cot: false},
    Config = {Amplitude: 2, Size: 10, Speed: 1},
    Pos_X  = 0 - Config.Size / 2;

setInterval(()=>{if (Pos_X>=window.innerWidth) Pos_X = 0 - Config.Size / 2; else Pos_X += Config.Speed}, 1.5);

const AmpVal  = document.querySelector('#Amp'),
      SizeVal = document.querySelector('#Size');

setInterval(()=>{
	AmpVal.textContent = Config.Amplitude;
	SizeVal.textContent = Config.Size
}, 2);

function StartWave(type) {
	if (Comp[type]) {
		document.querySelector(`.${type}`).classList.toggle('Active');
		return;
	}
	const Coord = document.createElement('div');
	Coord.classList.add('Coord');
	Coord.classList.add(type);

	document.body.appendChild(Coord).classList.toggle('Active');

	setInterval(()=>document.getElementById(type).classList.contains('Active') && window.requestAnimationFrame(Animate(type)), 0.5);
	Comp[type] = true;
}

function Animate(Type) {
	document.querySelector(`.${Type}`).style.width = `${Config.Size}px`;
	document.querySelector(`.${Type}`).style.height = `${Config.Size}px`;
	document.querySelector(`.${Type}`).style.left = `${Pos_X}px`;
	switch (Type) {
		case 'Sin':
			document.querySelector('.Sin').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * Math.sin(Pos_X / 100) * 100 - Config.Size / 2)}px`;
		case 'Cos':
			document.querySelector('.Cos').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * Math.cos(Pos_X / 100) * 100 - Config.Size / 2)}px`;
		case 'Tan':
			document.querySelector('.Tan').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * Math.tan(Pos_X / 100) * 100 - Config.Size / 2)}px`;
		case 'Sec':
			document.querySelector('.Sec').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * (1 / Math.cos(Pos_X / 100)) * 100 - Config.Size / 2)}px`;
		case 'Csc':
			document.querySelector('.Csc').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * (1 / Math.sin(Pos_X / 100)) * 100 - Config.Size / 2)}px`;
		case 'Cot':
			document.querySelector('.Cot').style.top = `${window.innerHeight / 2 + (Config.Amplitude * 0.5 * (1 / Math.tan(Pos_X / 100)) * 100 - Config.Size / 2)}px`;
		default:
			break;
	}
}