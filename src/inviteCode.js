/* inviteCode.js
 *
 * Route format:  [majlis_count?] [nikah_count?] [i?] [p?]
 *   i = Majlis event identifier
 *   p = Nikah  event identifier
 *   count ∈ { 1, 2, a }   (a = All)
 *
 * ─────────────────────────────────────────────────
 *  Route    │ Majlis │ Nikah  │ Count shown?
 * ─────────────────────────────────────────────────
 *  /i       │  show  │  hide  │  no count
 *  /1i      │  1     │  hide  │  Majlis: 1
 *  /2i      │  2     │  hide  │  Majlis: 2
 *  /ai      │  All   │  hide  │  Majlis: All
 *  /1p      │  hide  │  1     │  Nikah: 1
 *  /2p      │  hide  │  2     │  Nikah: 2
 *  /ap      │  hide  │  All   │  Nikah: All
 *  /ip      │  show  │  show  │  no count
 *  /11ip    │  1     │  1     │  both
 *  /12ip    │  1     │  2     │  both
 *  /1aip    │  1     │  All   │  both
 *  /21ip    │  2     │  1     │  both
 *  /22ip    │  2     │  2     │  both
 *  /2aip    │  2     │  All   │  both
 *  /a1ip    │  All   │  1     │  both
 *  /a2ip    │  All   │  2     │  both
 *  /aaip    │  All   │  All   │  both
 * ─────────────────────────────────────────────────
 *  /        │  hide  │  show  │  no count  (default)
 *  /NB      │  screenshot mode — no buttons
 * ─────────────────────────────────────────────────
 *
 * 'S' (Show) = event visible but no invitee count printed
 */

export function parseInviteCode(pathname) {
  const raw = (pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!raw || raw === 'nb') return null;

  // Regex: optional count1, optional count2, optional i, optional p
  const m = raw.match(/^([12a])?([12a])?(i)?(p)?$/);
  if (!m) return null;

  const c1   = m[1];      // first count char  (a / 1 / 2)
  const c2   = m[2];      // second count char
  const hasI = !!m[3];   // majlis present
  const hasP = !!m[4];   // nikah present

  if (!hasI && !hasP) return null;  // nothing recognised

  let majlis = null;
  let nikah  = null;

  if (hasI && hasP) {
    // Both events: c1 → majlis count, c2 → nikah count
    majlis = c1 ? c1.toUpperCase() : 'S';
    nikah  = c2 ? c2.toUpperCase() : 'S';
  } else if (hasI) {
    majlis = c1 ? c1.toUpperCase() : 'S';
  } else {
    nikah = c1 ? c1.toUpperCase() : 'S';
  }

  return { majlis, nikah };
}

/** Format count code for display. 'S' is handled upstream (no label rendered). */
export function formatGuestCount(code) {
  return code === 'A' ? 'All' : code;
}
