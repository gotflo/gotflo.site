/**
 * ==========================================================
 *  Configuration — API Keys
 * ==========================================================
 *  La clé Gemini est obfusquée (boîte noire).
 *  Les clés EmailJS restent en clair (clés publiques).
 */

/* ---- Décodeur interne Gemini (ne pas modifier) ---- */
function _dk(s, o, d) {
  return o.map(function(i) { return s[i]; }).map(function(f) {
    for (var r = '', j = 0; j < f.length; j++)
      r += String.fromCharCode(f.charCodeAt(j) - d);
    return r;
  }).join('');
}

const APP_CONFIG = {

  gemini: {
    /* Gemini API Key — shift +2, 7 fragments mélangés */
    get apiKey() {
      return _dk(
        'HovD;2\x00F8mlZ4\x00ac[\x00CIP;Is\x00CK|cU{\x00[tme3:\x00w;r2hk'
          .split('\x00'),
        [4, 1, 6, 3, 0, 5, 2],
        2
      );
    }
  },

  emailjs: {
    publicKey:  'OGB_QN5cTEkY2MC2D',
    serviceId:  'service_jdufvth',
    templateId: 'template_jh266nf',
  }
};

// Signal que la config est prête
const configReady = Promise.resolve();
