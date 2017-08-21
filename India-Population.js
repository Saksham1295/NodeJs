let fs = require('fs');
let main = {};
let Reader = fs.createReadStream('Indicators.csv');
let Writer = fs.createWriteStream('India.json');
Reader.setEncoding('UTF-8');

Reader.on('data', function(chunk) {
	let data;
	data += chunk;
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Population = line[0].split(",");
		if(Population[1] == "IND") {
			if(Population[Population.length - 3] == "SP.URB.TOTL.IN.ZS" ) {
				main[Population[Population.length - 2]] = main[Population[Population.length - 2]] || [];
				main[Population[Population.length - 2]].push({
					"Urban total Population " : Population[Population.length - 1]
				}) 
			} else if(Population[Population.length - 3] == "SP.RUR.TOTL.ZS") {
				main[Population[Population.length - 2]] = main[Population[Population.length - 2]] || [];
				main[Population[Population.length - 2]].push({
					"Rural Total Population" : Population[Population.length - 1]
				}) 
			}
		}
		
	})
})
Reader.on('end',function() {
	Writer.write(JSON.stringify(main,null,2),'UTF-8');
});