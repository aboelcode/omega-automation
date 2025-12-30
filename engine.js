const { chromium } = require('playwright');
const { stealth } = require('playwright-stealth');

async function runView(viewNumber) {
    console.log(`\n--- Starting View #${viewNumber} ---`);
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    try {
        // 1. Log IP Address
        await page.goto('https://api.ipify.org?format=json');
        const ipData = await page.textContent('body');
        console.log(`🌐 View #${viewNumber} IP: ${ipData}`);

        // 2. Go to YouTube Video (Replace URL with your video)
        const videoUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'; 
        console.log(`📺 Accessing Video...`);
        await page.goto(videoUrl, { waitUntil: 'networkidle' });

        // 3. Simple Retention: Wait for 60 seconds (Adjust as needed for full view)
        console.log(`⏳ Watching for 60 seconds (Test Mode)...`);
        await page.waitForTimeout(60000); 

        console.log(`✅ View #${viewNumber} Completed.`);
    } catch (err) {
        console.error(`❌ Error in View #${viewNumber}: `, err.message);
    } finally {
        await browser.close();
    }
}

(async () => {
    // Run 2 views sequentially for testing
    await runView(1);
    await runView(2);
    console.log("\n🏁 All test views completed.");
})();
