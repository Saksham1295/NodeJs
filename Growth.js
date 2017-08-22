let fs = require('fs');
let main = [];
let Reader = fs.createReadStream('Indicators.csv');
let Writer = fs.createWriteStream('India_Growth.json');
Reader.setEncoding('UTF-8');

Reader.on('data', (chunk) => {
	let data;
	data += chunk;
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Urban = line[0].split(",");
		if(Urban[1] == "IND") {
			if(Urban[Urban.length - 3] == "SP.URB.GROW" ) {
				//main[Urban[Urban.length - 2]] = main[Urban[Urban.length - 2]] || [];
				main.push({
					"Year":Urban[Urban.length - 2],
					"Urban total Population Growth " : Urban[Urban.length - 1]
				}) 
			} 
		}
	})
})
Reader.on('end',() => {
 Writer.write(JSON.stringify(main,null,2),'UTF-8');
});