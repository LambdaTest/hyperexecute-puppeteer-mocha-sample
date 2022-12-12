const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const caps = {
	browserName    : 'Chrome',
	browserVersion : 'latest',
	'LT:Options'   : {
		platform   : process.env.HYPEREXECUTE_PLATFORM,
		build      : 'Sample Puppeteer-Mocha',
		name       : 'Puppeteer-mocha test on Edge',
		user       : process.env.LT_USERNAME,
		accessKey  : process.env.LT_ACCESS_KEY,
		network    : true,
		visual     : true,
		console    : true
	}
};

let browser = null;
let page = null;
describe('Search Text', () => {
	beforeEach(async () => {
		browser = await puppeteer.connect({
			browserWSEndpoint : `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(
				JSON.stringify(caps)
			)}`,
			ignoreHTTPSErrors: true
		});
		page = await browser.newPage();
	});

	it('should be titled "Google"', async () => {
		let text = 'Google';
		await page.goto('https://www.duckduckgo.com');
		var element = await page.$('[name="q"]');
		await element.click();
		await element.type(text);
		await Promise.all([
			page.keyboard.press('Enter'),
			page.waitForNavigation()
		]);
		var title = await page.title();
		expect(title).equal(text + ' at DuckDuckGo', 'Expected page title is incorrect!');
		const firstResult = await page.$('#r1-0 h2')
		await firstResult.click();
		await page.waitForTimeout(2000);
		var googleSerachField = await page.$('[name="q"]');
		await googleSerachField.click();
		await googleSerachField.type("Hello");
		await page.keyboard.press('Enter');
		await Promise.all([
			page.waitForNavigation()
		]);
		var googleSerachTitle = await page.title();
		expect(googleSerachTitle).equal('Hello - Google Search', 'Google -Expected page title is incorrect!');
		//Lambdatest sample app test
		await page.goto('https://lambdatest.github.io/sample-todo-app/');
		await page.waitForTimeout(5000);
		for (let i = 1; i < 5; i++) {
			await page.click('body > div > div > div > ul > li:nth-child(' + i + ') > input');
		}
		//adding 10 custom element
		for (let i = 5; i < 10; i++) {
			await page.type('#sampletodotext', 'Hypertest LambdaTest');
			await page.click('#addbutton');
			await page.click('body > div > div > div > ul > li:nth-child(' + i + ') > input');
			await page.waitForTimeout(1000);
		}
	});

	afterEach(async () => {
		await page.close();
		await browser.close();
	});
});