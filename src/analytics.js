import { FIREBASE_DB_URL, ANALYTICS_ENABLED } from './analyticsConfig';

/* ── Device / browser detection from userAgent ───────────────────── */
function getDeviceInfo() {
  const ua = navigator.userAgent;

  let device = 'Desktop';
  if (/iPhone/.test(ua))            device = 'iPhone';
  else if (/iPad/.test(ua))         device = 'iPad';
  else if (/Android.*Mobile/.test(ua)) device = 'Android Phone';
  else if (/Android/.test(ua))      device = 'Android Tablet';

  let browser = 'Other';
  if (/Edg\//.test(ua))             browser = 'Edge';
  else if (/OPR\/|Opera/.test(ua))  browser = 'Opera';
  else if (/Chrome/.test(ua))       browser = 'Chrome';
  else if (/Safari/.test(ua))       browser = 'Safari';
  else if (/Firefox/.test(ua))      browser = 'Firefox';

  let os = 'Other';
  const iosMatch = ua.match(/iPhone OS ([\d_]+)/);
  if (iosMatch)               os = `iOS ${iosMatch[1].replace(/_/g, '.')}`;
  else if (/iPad/.test(ua))   os = 'iPadOS';
  const andMatch = ua.match(/Android ([\d.]+)/);
  if (andMatch)               os = `Android ${andMatch[1]}`;
  else if (/Mac/.test(ua))    os = 'macOS';
  else if (/Windows/.test(ua))os = 'Windows';

  return {
    device,
    browser,
    os,
    screen: `${window.screen.width}×${window.screen.height}`,
  };
}

/* ── IP-based location — no permission needed, city/country level ── */
async function getLocation() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res  = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timer);
    const d = await res.json();
    return {
      city:    d.city        || '—',
      region:  d.region      || '—',
      country: d.country_name|| '—',
      isp:     d.org         || '—',
    };
  } catch {
    return { city: '—', region: '—', country: '—', isp: '—' };
  }
}

/* ── Main track function — call on play / page open ─────────────── */
export async function trackPlay(route = '/') {
  if (!ANALYTICS_ENABLED) return;
  if (FIREBASE_DB_URL.includes('YOUR-PROJECT')) return; // not configured yet

  const [device, location] = await Promise.all([
    Promise.resolve(getDeviceInfo()),
    getLocation(),
  ]);

  const payload = {
    ts:      new Date().toISOString(),
    route,
    ...device,
    ...location,
  };

  try {
    await fetch(`${FIREBASE_DB_URL}/analytics/plays.json`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
  } catch {
    // Silent fail — analytics must never break the invite
  }
}
