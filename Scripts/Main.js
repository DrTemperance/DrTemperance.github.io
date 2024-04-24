// Stylize //
document.addEventListener('DOMContentLoaded', ()=>
	 document.addEventListener('mousemove', event=>
			document.querySelectorAll('.Eventful').forEach(element=>{
				element.style.left = `${event.clientX}px`;
				element.style.top = `${event.clientY}px`;
			})));