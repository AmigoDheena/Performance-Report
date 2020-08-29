const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false}); // default is true
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('https://www.amazon.in/');
    await page.screenshot({path: 'amazon.png'}); 
    await browser.close();
})();