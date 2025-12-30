const { chromium } = require('playwright');
const { stealth } = require('playwright-stealth');

async function runView(viewNumber) {
    console.log(`\n--- Starting View #${viewNumber} ---`);
    const browser = await chromium.launch({ headless: true });
    
    try {
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        
        const page = await context.newPage();
        // Apply stealth
        const { stealth } = require('playwright-stealth');
        // Note: In some versions it's a plugin for playwright-extra, 
        // but here we use it as a standalone script injection if needed.

        // 1. Log IP Address
        await page.goto('https://api.ipify.org?format=json', { waitUntil: 'networkidle' });
        const ipData = await page.textContent('body');
        console.log(`🌐 View #${viewNumber} IP: ${ipData}`);

        // 2. Go to YouTube
        const videoUrl = 'https://www.youtube.com/watch?v=680U_m28-X8'; // تم وضع فيديو تجريبي، غيره لرابطك
        console.log(`📺 Accessing Video...`);
        await page.goto(videoUrl, { waitUntil: 'domcontentloaded' });
        
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
    try {
        await runView(1);
        await runView(2);
        console.log("\n🏁 All test views completed successfully.");
    } catch (mainErr) {
        console.error("❌ Fatal Engine Error:", mainErr);
        process.exit(1);
    }
})();
