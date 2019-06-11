const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urls = ['view-source:https://techcrunch.com/','view-source:http://www.bbcamerica.com/','view-source:http://www.google.com/']

	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		await page.goto(`${url}`);    
		const found = await page.evaluate(() => window.find("wp-includes"));
		console.log(found);

		fs.appendFile('test1.txt', url + found + '\n' , function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	}
  await browser.close();
})();
