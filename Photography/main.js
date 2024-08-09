import fs from 'fs';
import path from 'path';

export function *readAllFiles (dir : string) : Generator<string> {
	const Files = fs.readdirSync(dir, {withFileTypes: true});
	let Imgs = [];
	for (const File of Files) {
		let FilePath = path.join(dir, File.name);
		if (File.isDirectory()) {
			yield *readAllFiles(FilePath);
		} else yield FilePath;

		Imgs.push(FilePath);
	}
}

document.body.addEventListener("DOMContentLoaded", ()=>
	 Imgs.forEach(Img=>{
		 let img = document.createElement('img');
		 img.src = Img;
		 document.body.appendChild(img)
	 }));