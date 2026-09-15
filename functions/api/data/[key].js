// functions/api/data/[key].js

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });

export async function onRequestGet({ params, env }) {
  const key = params.key;
  if (!key) return json({ error: 'missing key' }, 400);

  const value = await env.SCHEDULE_KV.get(key, { type: 'json' });
  return json({ key, value: value ?? null });
}

export async function onRequestPut({ params, request, env }) {
  const key = params.key;
  if (!key) return json({ error: 'missing key' }, 400);

  const body = await request.json().catch(() => null);
  if (!body || !('value' in body)) return json({ error: 'missing value' }, 400);

  await env.SCHEDULE_KV.put(key, JSON.stringify(body.value));
  return json({ ok: true, key });
}

export async function onRequestDelete({ params, env }) {
  const key = params.key;
  if (!key) return json({ error: 'missing key' }, 400);

  await env.SCHEDULE_KV.delete(key);
  return json({ ok: true, key });
}