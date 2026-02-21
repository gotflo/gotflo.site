/**
 * ==========================================================
 *  Configuration — API Keys & Secrets
 * ==========================================================
 *
 *  ⚠️  Ce fichier est EXCLU de Git (.gitignore)
 *
 *  Setup :
 *  1. Copier config.example.js → config.js
 *  2. Remplacer les valeurs par vos vraies clés API
 */

const APP_CONFIG = {
  gemini: {
    apiKey: 'AIzaSyC_89vYrJifwcueWI3t_xw_yfNHaqUIVLk',
  },
  emailjs: {
    publicKey: 'OGB_QN5cTEkY2MC2D',
    serviceId: 'service_jdufvth',
    templateId: 'template_jh266nf',
  }
};

// Signal que la config est prête (pour compatibilité avec await configReady)
const configReady = Promise.resolve();
console.log('✅ Configuration loaded');
