const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	var jsonlist = require('./urllist.json')
	const urls = jsonlist.search

	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		await page.goto(`${url.URL}`);    
		const found = await page.evaluate(() => window.find("wp-includes"));
		console.log(url.URL + "  " +found);

		fs.appendFile('result.txt', url.URL + " " +found + '\n' , function (err) {
			if (err) throw err;
		});
	}

	await browser.close();
})();
