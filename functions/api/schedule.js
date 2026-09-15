// functions/api/schedule.js
export async function onRequest() {
  return new Response(JSON.stringify({ ok: true, msg: 'schedule api placeholder' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
