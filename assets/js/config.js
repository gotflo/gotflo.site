/**
 * ==========================================================
 *  Configuration — API Keys & Secrets
 * ==========================================================
 *
 *  Ce fichier contient les clés API sensibles.
 *  ⚠️  NE PAS committer ce fichier dans Git !
 *      Il est listé dans .gitignore
 *
 *  Pour déployer :
 *  1. Copier config.example.js → config.js
 *  2. Remplacer les valeurs par vos vraies clés
 */

const APP_CONFIG = {
  gemini: {
    apiKey: 'AIzaSyCLdv3j9uFrOUGTTPSSn5DWBnEk6dQlLT8',
  },
  emailjs: {
    publicKey: 'OGB_QN5cTEkY2MC2D',
    serviceId: 'service_jdufvth',
    templateId: 'template_jh266nf',
  }
};
