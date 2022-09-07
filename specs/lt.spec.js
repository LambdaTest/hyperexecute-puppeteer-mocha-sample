const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const caps = {
	browserName    : 'Chrome',
	browserVersion : 'latest',
	'LT:Options'   : {
		platform   : process.env.HYPEREXECUTE_PLATFORM,
		build      : 'Sample Puppeteer-Mocha',
		name       : 'Puppeteer-mocha test on Chrome',
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

	it('should be titled "Lambdatest"', async () => {
		let text = 'LambdaTest';
		await page.goto('https://www.duckduckgo.com');
		var element = await page.$('[name="q"]');
		await element.click();
		await element.type(text);
		await Promise.all([
			page.keyboard.press('Enter'),
			page.waitForNavigation()
		]);
		var title = await page.title();
		try {
			expect(title).equal(text + ' at DuckDuckGo', 'Expected page title is incorrect!');
			await page.evaluate(
				(_) => {},
				`lambdatest_action: ${JSON.stringify({
					action    : 'setTestStatus',
					arguments : { status: 'passed', remark: 'assertion passed' }
				})}`
			);
		} catch (e) {
			await page.evaluate(
				(_) => {},
				`lambdatest_action: ${JSON.stringify({
					action    : 'setTestStatus',
					arguments : { status: 'failed', remark: e.name }
				})}`
			);
		}
	});

	afterEach(async () => {
		await page.close();
		await browser.close();
	});
});