/* ─────────────────────────────────────────────────────────────────
 * ANALYTICS CONFIGURATION
 *
 * Values come from your .env.local file (see .env.example).
 * Change the .env.local values and redeploy — no code edits needed.
 *
 * FIREBASE SETUP (one-time, 5 minutes):
 *  1. Firebase Console → your project → Realtime Database → Create Database
 *  2. Rules tab → paste:  { "rules": { ".read": true, ".write": true } }
 *     → Publish
 *  3. Copy the database URL shown at the top
 *  4. Put it in your .env.local as REACT_APP_FIREBASE_DB_URL
 *  5. npm run build  →  firebase deploy
 *
 * ───────────────────────────────────────────────────────────────── */

// Read from .env.local  →  falls back to empty string (analytics disabled)
export const FIREBASE_DB_URL =
  process.env.REACT_APP_FIREBASE_DB_URL || '';

export const ANALYTICS_ENABLED =
  process.env.REACT_APP_ANALYTICS_ENABLED !== 'false';

// Password to access /analytics page
// Change here + redeploy (same pattern as ADMIN_PASSWORD and MUSIC_TRACK)
export const ANALYTICS_PASSWORD = 'IZ786';
