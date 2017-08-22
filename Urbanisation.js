let fs = require('fs');
let urb_pop= [];
let urb_growth = [];
let total = [];
let asia=['ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'CXR', 'CCK', 'IOT', 'GEO', 'HKG', 'IND', 'IDN', 'IRN', 'IRQ', 'ISR', 'JPN', 'JOR', 'KAZ', 'KWT', 'KGZ', 'LAO', 'LBN', 'MAC', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN', 'PAK', 'PSE', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN', 'TJK', 'THA', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'];
let Reader = fs.createReadStream('Indicators.csv', 'UTF-8');
let Ind_Pop_Writer = fs.createWriteStream('IND-Population.json');
let Ind_Grow_Writer = fs.createWriteStream('IND-Growth.json');
let Total_Poplation = fs.createWriteStream('ASIA-Total.json');
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
		if(Urban[1] == "IND") {
			if(Urban[Urban.length - 3] == "SP.URB.GROW" ) {
				urb_growth.push({"Year":Urban[Urban.length - 2],
					"Urban_Growth" : Urban[Urban.length - 1]
				}) 
			} 
		}
		if((asia.find(x => x === Urban[1]) != undefined)){
			if(Urban[Urban.length-3] === 'SP.POP.TOTL'){
				total.push({"Year": Urban[Urban.length - 2],
					"Country Name" : Urban[0],
					"Country" : Urban[1],
					"Total_Population" : Urban[Urban.length-1]
				});
			}
		}
	})
})
Reader.on('close',() => {
	Ind_Pop_Writer.write(JSON.stringify(urb_pop,null,2),'UTF-8');
	Ind_Grow_Writer.write(JSON.stringify(urb_growth,null,2),'UTF-8');
	Total_Poplation.write(JSON.stringify(total,null,2),'UTF-8');
});