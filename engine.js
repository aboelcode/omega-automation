const { chromium } = require('playwright');
const { stealth } = require('playwright-stealth');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log("🚀 OMEGA Engine Started...");
    await page.goto('https://www.youtube.com');
    console.log("✅ Target Reached: " + await page.title());
    
    await browser.close();
    console.log("🏁 Engine Task Completed.");
})();
