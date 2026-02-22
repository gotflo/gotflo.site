/**
 * ==========================================================
 *  Configuration — Obfuscated API Keys
 * ==========================================================
 *
 *  Instructions :
 *  1. Copier ce fichier : config.example.js → config.js
 *  2. Encoder vos clés avec le script encode_key.js
 *  3. Remplacer les fragments ci-dessous
 *  4. Ne jamais committer config.js
 *
 *  Méthode d'obfuscation :
 *  - Chaque clé est découpée en fragments
 *  - Les fragments sont encodés par décalage de caractères (+N)
 *  - Ils sont stockés dans un ordre mélangé
 *  - Le getter _dk() les décode à la volée
 */

function _dk(s, o, d) {
  return o.map(function(i) { return s[i]; }).map(function(f) {
    for (var r = '', j = 0; j < f.length; j++)
      r += String.fromCharCode(f.charCodeAt(j) - d);
    return r;
  }).join('');
}

const APP_CONFIG = {
  gemini: {
    get apiKey() {
      return _dk(
        ['ENCODED_FRAG_0', 'ENCODED_FRAG_1', '...'],
        [/* order map */],
        2  // shift value
      );
    }
  },
  emailjs: {
    get publicKey() {
      return _dk(['...'], [0], 4);
    },
    get serviceId() {
      return _dk(['...'], [0], 2);
    },
    get templateId() {
      return _dk(['...'], [0], 5);
    }
  }
};

const configReady = Promise.resolve();
