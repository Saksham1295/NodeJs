let fs = require('fs');
let main = {};
let Reader = fs.createReadStream('Indicators.csv');
let Writer = fs.createWriteStream('India_Growth.json');
Reader.setEncoding('UTF-8');

Reader.on('data', function(chunk) {
	let data;
	data += chunk;
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Urban = line[0].split(",");
		if(Urban[1] == "IND") {
			if(Urban[Urban.length - 3] == "SP.URB.GROW" ) {
				main[Urban[Urban.length - 2]] = main[Urban[Urban.length - 2]] || [];
				main[Urban[Urban.length - 2]].push({
					"Urban total Population Growth " : Urban[Urban.length - 1]
				}) 
			} else if(Urban[Urban.length - 3] == "SP.RUR.TOTL.ZG") {
				main[Urban[Urban.length - 2]] = main[Urban[Urban.length - 2]] || [];
				main[Urban[Urban.length - 2]].push({
					"Rural Total Population Growth" : Urban[Urban.length - 1]
				}) 
			}
		}
	})
})
Reader.on('end',function() {
 Writer.write(JSON.stringify(main,null,2),'UTF-8');
});