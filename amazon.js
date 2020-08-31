const puppeteer = require('puppeteer');
const fs = require('fs');
const search_term = 'ps4+games'
const url = 'https://www.amazon.in/s?k='+search_term;
const selector = '.s-include-content-margin';
(async function(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    const product = await page.$$eval(selector, nodes => {
        return nodes.map(node => {
            const title = node.querySelector('.a-size-medium').textContent;
            const price = document.querySelector('span .a-offscreen').textContent;
            const rating = document.querySelector('.aok-align-bottom span').textContent;
            const img = node.querySelector('.s-image').getAttribute('src');
            return {
                title,
                price,
                img,
                rating
            }
        })
    });

    //Save file as JSON
    const jsonContent = JSON.stringify(product);
    fs.writeFile("./myjsonfile.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    console.log(product);
    await browser.close();
})();