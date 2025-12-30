import asyncio
import random
from playwright.async_api import async_playwright
from playwright_stealth import stealth

async def run_organic_boost():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        # تصحيح الاستدعاء هنا
        await stealth(page)

        try:
            print("🔍 Accessing YouTube...")
            await page.goto("https://www.youtube.com")
            await asyncio.sleep(random.uniform(3, 6))

            search_query = "أهم 50 أمر لينكس في 6 دقايق ! Top 50 Linux Commands"
            print(f"⌨️ Searching for: {search_query}")
            
            # التعامل مع أي نافذة موافقة قد تظهر
            try:
                if await page.query_selector('button[aria-label="Accept all"]'):
                    await page.click('button[aria-label="Accept all"]')
            except:
                pass

            await page.fill('input[name="search_query"]', search_query)
            await page.keyboard.press("Enter")
            await page.wait_for_selector("ytd-video-renderer", timeout=10000)

            target_id = "FW_PekFe-Lk"
            video_link = f'a[href*="{target_id}"]'
            
            if await page.query_selector(video_link):
                print("🎯 Target found! Increasing CTR...")
                await page.click(video_link)
                
                # مشاهدة 90% من الفيديو (فيديو 6 دقائق = 360 ثانية)
                watch_seconds = random.randint(320, 355)
                print(f"🎬 High Retention Watch: {watch_seconds} seconds...")
                await asyncio.sleep(watch_seconds)
                print("✅ Video boost completed successfully.")
            else:
                print("❌ Video ID not visible in top results.")

        except Exception as e:
            print(f"⚠️ Runtime Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_organic_boost())
