// check-and-publish.js
// Runs daily via GitHub Actions at 6 AM IST
// 1. Checks Supabase for blogs due today or earlier
// 2. If any are found → triggers Vercel redeploy
// 3. After deploy → pings IndexNow to notify Google/Bing
// 4. Marks blogs as published in Supabase

import { createClient } from '@supabase/supabase-js';

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  VERCEL_DEPLOY_HOOK_URL,
  INDEXNOW_KEY,
  SITE_URL = 'https://www.lokaviainternational.com',
} = process.env;

// Validate required env vars
const required = { SUPABASE_URL, SUPABASE_SERVICE_KEY, VERCEL_DEPLOY_HOOK_URL, INDEXNOW_KEY };
for (const [key, val] of Object.entries(required)) {
  if (!val) {
    console.error(`❌ Missing required secret: ${key}`);
    process.exit(1);
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  console.log(`📅 Checking for blogs due on or before: ${today}`);

  // Fetch all unpublished blogs whose publish_date has arrived
  const { data: duePosts, error } = await supabase
    .from('blog_schedule')
    .select('slug, title, publish_date')
    .eq('published', false)
    .lte('publish_date', today)
    .order('publish_date', { ascending: true });

  if (error) {
    console.error('❌ Supabase query failed:', error.message);
    process.exit(1);
  }

  if (!duePosts || duePosts.length === 0) {
    console.log('✅ No blogs due today. Nothing to publish.');
    return;
  }

  console.log(`📝 Found ${duePosts.length} blog(s) to publish:`);
  duePosts.forEach(p => console.log(`   • [${p.publish_date}] ${p.slug}`));

  // Step 1: Trigger Vercel redeploy
  console.log('\n🚀 Triggering Vercel deployment...');
  const deployRes = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });

  if (!deployRes.ok) {
    console.error(`❌ Vercel deploy hook failed: ${deployRes.status} ${deployRes.statusText}`);
    process.exit(1);
  }

  console.log('✅ Vercel deployment triggered successfully.');

  // Step 2: Wait for Vercel build to complete (~90 seconds)
  console.log('⏳ Waiting 90 seconds for Vercel build to finish...');
  await new Promise(resolve => setTimeout(resolve, 90_000));

  // Step 3: Ping IndexNow with new blog URLs
  const newUrls = duePosts.map(p => `${SITE_URL}/insights/${p.slug}`);
  console.log('\n🔔 Pinging IndexNow with new URLs:');
  newUrls.forEach(u => console.log(`   • ${u}`));

  const indexNowPayload = {
    host: SITE_URL.replace('https://', '').replace('http://', ''),
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: newUrls,
  };

  const indexNowRes = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(indexNowPayload),
  });

  if (indexNowRes.ok || indexNowRes.status === 202) {
    console.log(`✅ IndexNow accepted ${newUrls.length} URL(s). Status: ${indexNowRes.status}`);
  } else {
    // Non-fatal: log and continue. Blog is still published.
    console.warn(`⚠️  IndexNow returned ${indexNowRes.status}. URLs will still be discovered via sitemap.`);
  }

  // Step 4: Mark blogs as published in Supabase
  const slugs = duePosts.map(p => p.slug);
  const { error: updateError } = await supabase
    .from('blog_schedule')
    .update({ published: true, published_at: new Date().toISOString() })
    .in('slug', slugs);

  if (updateError) {
    console.error('❌ Failed to mark blogs as published in Supabase:', updateError.message);
    process.exit(1);
  }

  console.log(`\n🎉 Done! ${duePosts.length} blog(s) published and indexed.`);
  duePosts.forEach(p => console.log(`   ✓ ${SITE_URL}/insights/${p.slug}`));
}

main().catch(err => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
