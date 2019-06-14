const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	var jsonlist = require('./file.json')
	const urls = jsonlist.search

	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		await page.goto(`${url.URL}`);    
		const found = await page.evaluate(() => window.find("wp-includes"));
		// console.log(url.URL + "  " +found);

		// save as text file
			// fs.appendFile('result.txt', url.URL + " " +found + '\n' , function (err) {
			// 	if (err) throw err;
			// });
		// save as text file

		// Save as Json
			fs.readFile('./myjsonfile.json', 'utf-8', function(err, data) {
				if (err) throw err

				var arrayOfObjects = JSON.parse(data)
				arrayOfObjects.users.push({
					url: url.URL,
					wordpress: found
				})

				console.log(arrayOfObjects)

				fs.writeFile('./myjsonfile.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
					if (err) throw err
					console.log('Done!')
				})
			})
		// Save as Json
	}

	await browser.close();
})();
