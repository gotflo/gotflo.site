/**
 * API Key Obfuscation Utility
 *
 * Scheme:
 *   1. The key is split into 7 fragments.
 *   2. Each fragment is character-shifted by +SHIFT.
 *   3. The shifted fragments are stored in a shuffled (non-sequential) order.
 *   4. An order map tells the decoder which stored index corresponds to
 *      which original fragment position.
 *
 * To reconstruct:
 *   1. Read fragments from the stored array using the order map.
 *   2. Reverse the character shift (-SHIFT on each char code).
 *   3. Join the fragments in the correct order.
 */

function getApiKey() {
  // Shifted fragments stored in shuffled order
  const chunks = [
    'IpwE<3',   // stored index 0  (original fragment 4)
    'G9nm[5',   // stored index 1  (original fragment 1)
    'bd\\',     // stored index 2  (original fragment 6)
    'DJQ<Jt',   // stored index 3  (original fragment 3)
    'DL}dV|',   // stored index 4  (original fragment 0)
    '\\unf4;',  // stored index 5  (original fragment 5)
    'x<s3il',   // stored index 6  (original fragment 2)
  ];

  // Order map: orderMap[i] = stored index that holds original fragment i
  // Fragment 0 is at stored index 4
  // Fragment 1 is at stored index 1
  // Fragment 2 is at stored index 6
  // Fragment 3 is at stored index 3
  // Fragment 4 is at stored index 0
  // Fragment 5 is at stored index 5
  // Fragment 6 is at stored index 2
  const orderMap = [4, 1, 6, 3, 0, 5, 2];

  const SHIFT = 3;

  // 1. Reorder: pick chunks in the correct original sequence
  const ordered = orderMap.map((storedIndex) => chunks[storedIndex]);

  // 2. Reverse the shift on every character
  const decoded = ordered.map((fragment) =>
    fragment
      .split('')
      .map((ch) => String.fromCharCode(ch.charCodeAt(0) - SHIFT))
      .join('')
  );

  // 3. Join all fragments
  return decoded.join('');
}


