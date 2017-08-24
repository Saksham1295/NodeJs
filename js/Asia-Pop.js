//Variable Declaration
let fs = require('fs');
let total = 0;
let main = [];
let temp = {};
let asia=['ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'CXR', 'CCK', 'IOT', 'GEO', 'HKG', 'IND', 'IDN', 'IRN', 'IRQ', 'ISR', 'JPN', 'JOR', 'KAZ', 'KWT', 'KGZ', 'LAO', 'LBN', 'MAC', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN', 'PAK', 'PSE', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN', 'TJK', 'THA', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'];
//CSV attachment
let Reader = fs.createReadStream('Indicators.csv','UTF-8');
//JSON file creation
let Writer = fs.createWriteStream('Asia.json');
//Chunk distribution 
Reader.on('data', (chunk) => {
	let data;
	data += chunk;
	let temp = {};
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Urban = line[0].split(",");
		//Json file format
		if(((asia.find(x => x === Urban[1]) != undefined)) && Urban[Urban.length - 3] == "SP.POP.TOTL") {
			if(main.find(x => x.year == Urban[Urban.length - 2]) == undefined) {
				  temp = { year : Urban[Urban.length - 2] }
					temp[Urban[0]] = parseFloat(Urban[Urban.length-1]);
					main.push(temp);
				}
				else {
					let index = main.findIndex(x => x.year === Urban[Urban.length -2]);
					main[index][Urban[0]] = parseFloat(Urban[Urban.length-1]);
				}
			}
	})
})
Reader.on('end',() => {
//Write on json file 
Writer.write(JSON.stringify(main,null,2),'UTF-8');
});
