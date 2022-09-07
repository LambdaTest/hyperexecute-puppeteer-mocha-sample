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
		for (let i = 1; i < 10; i++) {
			await page.type('#sampletodotext', 'Hypertest LambdaTest');
			await page.click('#addbutton');
			await page.click('body > div > div > div > ul > li:nth-child(' + i+5 + ' > input');
			await page.waitForTimeout(1000);
		}
		//Puppeteer site
		page.setViewport({ width: 1920, height: 1080 });
		await page.goto('https://pptr.dev/');
		await page.click('[href="/guides/"]');
		await page.click('[href="/api/"]');
		await page.waitForXPath('//h1[contains(text(), "API Reference")]'); 
		expect(await page.title()).equal('API Reference | Puppeteer');
		await page.click('[href="/api/puppeteer.accessibility"]');
		await page.waitForXPath('//h1[contains(text(), "Accessibility class")]');
		expect(await page.title()).equal('Accessibility class | Puppeteer');
		await page.click('[href="/api/puppeteer.accessibility.snapshot"]');
		await page.waitForXPath('//h1[contains(text(), "Accessibility.snapshot() method")]');
		expect(await page.title()).equal('Accessibility.snapshot() method | Puppeteer');
		await page.click('[href="/api/puppeteer.actionresult"]');
		await page.waitForXPath('//h1[contains(text(), "ActionResult type")]');
		expect(await page.title()).equal('ActionResult type | Puppeteer');
		await page.click('[href="/api/puppeteer.awaitable"]');
		await page.waitForXPath('//h1[contains(text(), "Awaitable type")]');
		expect(await page.title()).equal('Awaitable type | Puppeteer');
		await page.click('[href="/api/puppeteer.boundingbox.height"]');
		await page.waitForXPath('//h1[contains(text(), "BoundingBox.height property")]');
		expect(await page.title()).equal('BoundingBox.height property | Puppeteer');
		await page.click('[href="/api/puppeteer.boundingbox"]');
		await page.waitForXPath('//h1[contains(text(), "BoundingBox interface")]');
		expect(await page.title()).equal('BoundingBox interface | Puppeteer');
		await page.goto('https://pptr.dev/');
		await page.click('[href="/api/"]');
		await page.click('[href="/api/puppeteer.boundingbox.width"]');
		await page.waitForXPath('//h1[contains(text(), "BoundingBox.width property")]');
		expect(await page.title()).equal('BoundingBox.width property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.border"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.border property")]');
		expect(await page.title()).equal('BoxModel.border property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.content"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.content property")]');
		expect(await page.title()).equal('BoxModel.content property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.height"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.height property")]');
		expect(await page.title()).equal('BoxModel.height property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.margin"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.margin property")]');
		expect(await page.title()).equal('BoxModel.margin property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel interface")]');
		expect(await page.title()).equal('BoxModel interface | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.padding"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.padding property")]');
		expect(await page.title()).equal('BoxModel.padding property | Puppeteer');
		await page.click('[href="/api/puppeteer.boxmodel.width"]');
		await page.waitForXPath('//h1[contains(text(), "BoxModel.width property")]');
		expect(await page.title()).equal('BoxModel.width property | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.browsercontexts"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.browserContexts() method")]');
		expect(await page.title()).equal('Browser.browserContexts() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.close"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.close() method")]');
		expect(await page.title()).equal('Browser.close() method | Puppeteer');	
		await page.goto('https://pptr.dev/');
		await page.click('[href="/api/"]');	
		await page.click('[href="/api/puppeteer.browser.createincognitobrowsercontext"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.createIncognitoBrowserContext() method")]');
		expect(await page.title()).equal('Browser.createIncognitoBrowserContext() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.defaultbrowsercontext"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.defaultBrowserContext() method")]');
		expect(await page.title()).equal('Browser.defaultBrowserContext() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.disconnect"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.disconnect() method")]');
		expect(await page.title()).equal('Browser.disconnect() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.isconnected"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.isConnected() method")]');
		expect(await page.title()).equal('Browser.isConnected() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser"]');
		await page.waitForXPath('//h1[contains(text(), "Browser class")]');
		expect(await page.title()).equal('Browser class | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.newpage"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.newPage() method")]');
		expect(await page.title()).equal('Browser.newPage() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.pages"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.pages() method")]');
		expect(await page.title()).equal('Browser.pages() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.process"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.process() method")]');
		expect(await page.title()).equal('Browser.process() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.target"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.target() method")]');
		expect(await page.title()).equal('Browser.target() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.targets"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.targets() method")]');
		expect(await page.title()).equal('Browser.targets() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.useragent"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.userAgent() method")]');
		expect(await page.title()).equal('Browser.userAgent() method | Puppeteer');
		await page.click('[href="/api/puppeteer.browser.version"]');
		await page.waitForXPath('//h1[contains(text(), "Browser.version() method")]');
		expect(await page.title()).equal('Browser.version() method | Puppeteer');
	});

	afterEach(async () => {
		await page.close();
		await browser.close();
	});
});