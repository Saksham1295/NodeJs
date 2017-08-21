let fs = require('fs');
let main = {};
let MaindataReader = fs.createReadStream('Indicators.csv');
let MaindataWriter = fs.createWriteStream('Asia.json');
MaindataReader.setEncoding('UTF-8');

MaindataReader.on('data', function(chunk) {
	let data;
	data += chunk;
	data.trim()
	.split('\n')
	.map(line => line.split('\t'))
	.map((line) => {
		let Urban = line[0].split(",");
		// headpart[Urban[0]] = headpart[Urban[0]] || [];
		if((asia.find(x => x === Urban[1]) != undefined)){
		if(Urban[Urban.length-3] === 'SP.POP.TOTL'){
			main[Urban[Urban.length-2]] = main[Urban[Urban.length-2]] || [];
			main[Urban[Urban.length-2]].push({
						"Country Name" : Urban[0],
						"Country" : Urban[1],
						"Urban Population + Rural Population" : Urban[Urban.length-1]
					});
		}
		}
	})
})
MaindataReader.on('end',function() {
MaindataWriter.write(JSON.stringify(main,null,2),'UTF-8');
});

let asia=[
'ARM',
'AZE',
'BHR',
'BGD',
'BTN',
'BRN',
'KHM',
'CHN',
'CXR',
'CCK',
'IOT',
'GEO',
'HKG',
'IND',
'IDN',
'IRN',
'IRQ',
'ISR',
'JPN',
'JOR',
'KAZ',
'KWT',
'KGZ',
'LAO',
'LBN',
'MAC',
'MYS',
'MDV',
'MNG',
'MMR',
'NPL',
'PRK',
'OMN',
'PAK',
'PSE',
'PHL',
'QAT',
'SAU',
'SGP',
'KOR',
'LKA',
'SYR',
'TWN',
'TJK',
'THA',
'TUR',
'TKM',
'ARE',
'UZB',
'VNM',
'YEM'
];