/*
* @Author: amigodheena
* @Date:   2019-05-27 09:45:54
* @Last Modified by:   amigodheena
* @Last Modified time: 2019-05-28 10:25:14
*/

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 946 })
    await page.goto('https://gtmetrix.com/');   
   	// await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});
  	await page.setViewport({ width: 1920, height: 946 })
	await page.waitFor('input[name=url]')
    await page.$eval('input[name=url]', el => el.value = 'https://google.com')
    await page.click('button[type="submit"]')
 	await page.waitForNavigation({waitUntil:'networkidle2',timeout: 0})

	const PageSpeedScore_element = await page.$eval('body > div.page-wrapper > main > article > div.report-performance.clear > div.report-scores > div > div:nth-child(1) > span > span', e => e.innerText);
	const YSlowScore_element = await page.$eval('body > div.page-wrapper > main > article > div.report-performance.clear > div.report-scores > div > div:nth-child(2) > span > span', e => e.innerText);
	const FullyLoadedTime_element = await page.$eval('body > div.page-wrapper > main > article > div.report-performance.clear > div.report-page-details > div > div:nth-child(1) > span', e => e.innerText);
	const TotalPageSize_element = await page.$eval('body > div.page-wrapper > main > article > div.report-performance.clear > div.report-page-details > div > div.report-page-detail.report-page-detail-size > span', e => e.innerText);
	const Requests_element = await page.$eval('body > div.page-wrapper > main > article > div.report-performance.clear > div.report-page-details > div > div.report-page-detail.report-page-detail-requests > span', e => e.innerText);
    console.log(page.url());    
    console.log('PageSpeed Score:' + PageSpeedScore_element);
    console.log('YSlowScore:' + YSlowScore_element);
    console.log('Fully Loaded Time:' + FullyLoadedTime_element);
    console.log('Total Page Size:' + TotalPageSize_element);
    console.log('Requests:' + Requests_element);

	// Screenshot
		async function screenshotDOMElement(selector, padding = 0) {
		  const rect = await page.evaluate(selector => {
		    const element = document.querySelector('body > div.page-wrapper > main > article > div.report-head , body > div.page-wrapper > main > article > div.report-performance.clear');
		    const {x, y, width, height} = element.getBoundingClientRect();
		    return {left: x, top: y, width, height, id: element.id};
		  }, selector);

		  return await page.screenshot({
		    path: 'img/GTmetrix.png',
		    clip: {
		      x: rect.left - padding,
		      y: rect.top - padding,
		      width: rect.width + padding * 2,
		      height: rect.height + padding * 12
		    }
		  });
		}
		await screenshotDOMElement('header aside', 16);
	// Screenshot

    await browser.close();
})();