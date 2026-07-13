/* ─────────────────────────────────────────────────────────────────
 * MUSIC SETTINGS
 * Change MUSIC_TRACK to 1 or 2, then redeploy.
 *
 *   1 = Lakho Jaan Si  (Qusai Malindiwala)
 *   2 = wedding-music-2.mp3
 *
 * That's it — nothing else to touch.
 * ───────────────────────────────────────────────────────────────── */
export const MUSIC_TRACK = 1;

export const MUSIC_SRC =
  MUSIC_TRACK === 2 ? '/wedding-music-2.mp3' : '/wedding-music.mp3';
