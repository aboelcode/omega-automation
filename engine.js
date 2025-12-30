const { chromium } = require('playwright');

async function runView(num) {
    console.log(`\n--- Starting View #${num} ---`);
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        
        // Inline Stealth Injection (Safest way)
        const page = await context.newPage();
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });

        console.log("🌐 Checking IP...");
        await page.goto('https://api.ipify.org?format=json', { timeout: 60000 });
        const ip = await page.textContent('body');
        console.log(`🌐 View #${num} IP: ${ip}`);

        const videoUrl = 'https://www.youtube.com/watch?v=680U_m28-X8';
        console.log(`📺 Loading YouTube...`);
        await page.goto(videoUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        await page.waitForTimeout(15000); 
        console.log(`✅ View #${num} Finished.`);
    } catch (e) {
        console.error(`❌ Error: ${e.message}`);
    } finally {
        await browser.close();
    }
}

(async () => {
    console.log("🚀 Engine Launching...");
    await runView(1);
    await runView(2);
})();
