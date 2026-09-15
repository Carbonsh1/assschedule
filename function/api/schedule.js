// functions/api/schedule.js
export async function onRequestGet(context) {
  // 從 Cloudflare KV 讀取所有人最新的課表
  const data = await context.env.SCHEDULE_KV.get("schedules", { type: "json" });
  return new Response(JSON.stringify(data || null), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  });
}

export async function onRequestPost(context) {
  try {
    const newSchedule = await context.request.json();
    // 將最新修改儲存進 Cloudflare KV
    await context.env.SCHEDULE_KV.put("schedules", JSON.stringify(newSchedule));
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}
// Cloudflare redeploy trigger
