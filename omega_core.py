import asyncio
import random
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async

async def run_organic_boost():
    async with async_playwright() as p:
        # Launching with stealth to mimic a real human browser
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            viewport={'width': random.choice([1366, 1920]), 'height': random.choice([768, 1080])}
        )
        page = await context.new_page()
        await stealth_async(page)

        try:
            # 1. Start from YouTube Home
            print("🔍 Accessing YouTube...")
            await page.goto("https://www.youtube.com")
            await asyncio.sleep(random.uniform(2, 4))

            # 2. Perform Organic Search
            search_query = "أهم 50 أمر لينكس في 6 دقايق ! Top 50 Linux Commands"
            print(f"⌨️ Searching for: {search_query}")
            await page.fill('input[name="search_query"]', search_query)
            await page.keyboard.press("Enter")
            await page.wait_for_selector("ytd-video-renderer")

            # 3. Locate the specific video ID: FW_PekFe-Lk
            target_id = "FW_PekFe-Lk"
            video_link = f'a[href*="{target_id}"]'
            
            if await page.query_selector(video_link):
                print("🎯 Target video found! Boosting CTR...")
                await page.click(video_link)
                
                # 4. Watch simulation (High Retention: 80-95% of 6:10 min video)
                watch_seconds = random.randint(310, 360)
                print(f"🎬 Watching for {watch_seconds // 60}m {watch_seconds % 60}s...")
                
                # Randomized interaction (Scrolling)
                await asyncio.sleep(10)
                await page.mouse.wheel(0, 500)
                await asyncio.sleep(watch_seconds)
                
                print("✅ Successfully boosted search authority for @BasmatHiTech.")
            else:
                print("❌ Video ID not found in the top results.")

        except Exception as e:
            print(f"⚠️ Error encountered: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_organic_boost())
