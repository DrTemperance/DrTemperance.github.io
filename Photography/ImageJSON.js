const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, 'images/large'); // Specify the directory where images are stored
const outputJSONFile = path.join(__dirname, 'images/images.json');

function generateImageJSON() {
	fs.readdir(imageDirectory, (err, files)=>{
		if (err) {
			console.error('Error reading directory:', err);
			return;
		}

		const images = files
			 .filter(file=>/\.(jpg|jpeg|png|gif|webp)$/.test(file)) // Filter for image files
			 .map((file, index)=>({
				 id            : index,
				 exportFilename: path.basename(file, path.extname(file)),
				 title         : `Image ${index + 1}`,
				 caption       : `Caption for Image ${index + 1}`,
				 thumbIsLoading: false,
				 thumbHasLoaded: false
			 }));

		fs.writeFile(outputJSONFile, JSON.stringify({images}, null, 2), err=>{
			if (err) {
				console.error('Error writing JSON file:', err);
			} else {
				console.log('JSON file has been generated successfully.');
			}
		});
	});
}

generateImageJSON();