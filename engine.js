const { chromium } = require('playwright');
const { stealth } = require('playwright-stealth');

(async () => {
    console.log("🚀 OMEGA Engine Node.js Version Started...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');
    console.log("✅ Title: " + await page.title());
    await browser.close();
    console.log("🏁 Completed.");
})();
