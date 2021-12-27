const fs = require('fs');

const { roundPrice } = require('./helpers/logicFunc.helper');
const slug = require('slug') 
const { uuid } = require('uuidv4');


const FILE_NAME = './sample-data/bo-vest-nam.json';
const CATEGORY_ID = 'af52505a-a6c5-4ec1-ba07-e3cb54366f0b';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

fs.readFile(FILE_NAME, 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const databases = getUniqueListBy(JSON.parse(data), 'name');
		
		const writeData = JSON.stringify(databases.map(record => {
			record.id = uuid();
			record.category_id = CATEGORY_ID;
			record.meta_title = record.name;
			if (record.price < 10) {
				record.price = record.price*1000 + getRandomInt(0,999);
			}
			record.price = roundPrice(parseFloat(record.price/24));
			if (!record.root_price || record.root_price < 10) {
				record.root_price = record.price + record.price*Math.random();
			} else {
				record.root_price = roundPrice(parseFloat(record.root_price/24));
			}
			if (!record.short_description) {
				record.short_description = record.description.substring(0,250)
			} else if (record.short_description.length > 254) {
				record.short_description = record.short_description.substring(0, 250);
			}
			record.quantity = getRandomInt(10,200);
			record.sold = parseInt(record.sold, 10);
			record.images = JSON.stringify(record.images);
			record.slug = slug(record.name);

			return record;
		}));

		// write file to disk
		fs.writeFileSync(FILE_NAME, writeData);
    }

});
