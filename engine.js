const { chromium } = require('playwright');

const VIDEO_CONFIG = {
    keyword: 'اهم اضافات متصفح جوجل كروم 2025',
    videoID: '680U_m28-X8',
    viewsNeeded: 3,
    minRetention: 120, // seconds
    maxRetention: 240  // seconds
};

async function humanBehavior(page) {
    // Random scroll
    await page.mouse.wheel(0, Math.floor(Math.random() * 500) + 200);
    await page.waitForTimeout(Math.floor(Math.random() * 3000) + 2000);
}

async function runSession(id) {
    console.log(`\n🚀 Starting Session #${id}`);
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        deviceScaleFactor: 1
    });

    const page = await context.newPage();
    
    try {
        // Step 1: Search
        console.log(`🔍 Searching for: "${VIDEO_CONFIG.keyword}"`);
        await page.goto('https://www.youtube.com/results?search_query=' + encodeURIComponent(VIDEO_CONFIG.keyword));
        await page.waitForTimeout(3000);

        // Step 2: Identify and Click
        const selector = `a[href*="${VIDEO_CONFIG.videoID}"]`;
        if (await page.isVisible(selector)) {
            console.log("🎯 Video found in results. Clicking...");
            await page.click(selector);
        } else {
            console.log("⚠️ Video not in top results, forcing navigation.");
            await page.goto(`https://www.youtube.com/watch?v=${VIDEO_CONFIG.videoID}`);
        }

        // Step 3: Watch with Retention
        const watchTime = Math.floor(Math.random() * (VIDEO_CONFIG.maxRetention - VIDEO_CONFIG.minRetention + 1) + VIDEO_CONFIG.minRetention);
        console.log(`⏳ Watching for ${watchTime} seconds...`);
        
        for (let i = 0; i < Math.floor(watchTime / 30); i++) {
            await humanBehavior(page);
            process.stdout.write("."); // Progress indicator
        }

        console.log(`\n✅ Session #${id} Success.`);
    } catch (err) {
        console.log(`❌ Session #${id} Failed: ${err.message}`);
    } finally {
        await browser.close();
    }
}

(async () => {
    for (let i = 1; i <= VIDEO_CONFIG.viewsNeeded; i++) {
        await runSession(i);
    }
    console.log("\n🏁 All Sessions Completed.");
})();
