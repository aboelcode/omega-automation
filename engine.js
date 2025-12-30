const { chromium } = require('playwright');
const stealth = require('playwright-stealth');

async function runView(viewNumber) {
    console.log(`\n--- Starting View #${viewNumber} ---`);
    const browser = await chromium.launch({ headless: true });
    
    try {
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        // Apply Stealth to Context
        await stealth()(context);

        const page = await context.newPage();

        // 1. Log IP Address
        console.log("🌐 Checking IP...");
        await page.goto('https://api.ipify.org?format=json', { waitUntil: 'networkidle', timeout: 30000 });
        const ipData = await page.textContent('body');
        console.log(`🌐 View #${viewNumber} IP: ${ipData}`);

        // 2. Go to YouTube
        const videoUrl = 'https://www.youtube.com/watch?v=680U_m28-X8'; 
        console.log(`📺 Accessing Video...`);
        await page.goto(videoUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        console.log(`⏳ Watching (Test Mode 30s)...`);
        await page.waitForTimeout(30000); 

        console.log(`✅ View #${viewNumber} Completed.`);
    } catch (err) {
        console.error(`❌ Error in View #${viewNumber}: ${err.message}`);
    } finally {
        await browser.close();
    }
}

(async () => {
    console.log("🚀 Starting OMEGA Engine...");
    await runView(1);
    await runView(2);
    console.log("\n🏁 All test views processed.");
})();
