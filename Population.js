let fs = require('fs');
let urb_pop = [];
let Reader = fs.createReadStream('Indicators.csv');
let Writer = fs.createWriteStream('India.json');
Reader.setEncoding('UTF-8');

Reader.on('data', (chunk) => {
	let data;
	data += chunk;
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Urban = line[0].split(",");
		if(Urban[1] == "IND" && (Urban[Urban.length - 3] == "SP.URB.TOTL.IN.ZS" || Urban[Urban.length - 3] == "SP.RUR.TOTL.ZS")) {
			if(urb_pop.find(x => x.year === Urban[Urban.length - 2]) == undefined) {
					let temp = { year : Urban[Urban.length - 2] }
					temp[Urban[Urban.length - 3]] = parseFloat(Urban[Urban.length - 1]);
					urb_pop.push(temp);
				}
				else {
					let index = urb_pop.findIndex(x => x.year === Urban[Urban.length -2]);
					urb_pop[index][Urban[Urban.length - 3]] = parseFloat(Urban[Urban.length - 1]);
				}
			}
	})
})
Reader.on('end',() => {
	Writer.write(JSON.stringify(urb_pop,null,2),'UTF-8');
});