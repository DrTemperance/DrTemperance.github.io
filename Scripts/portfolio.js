document.querySelectorAll('#Project_Icon').forEach(e=>{
	e.addEventListener('mouseover', ()=>{
		e.style.transform = 'scale(135%) rotate(-7deg)';
		e.style.filter = 'drop-shadow(2px 2px 0.4em #000';
	});
	e.addEventListener('mouseout', ()=>{
		e.style.transform = 'scale(100%) rotate(0)';
		e.style.filter = '';
	});
});