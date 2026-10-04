(function () {
  'use strict';

  const frenchText = {
    'Home': 'Accueil',
    'About': 'À propos',
    'Resume': 'CV',
    'Services': 'Services',
    'Contact': 'Contact',
    'I am': 'Je suis',
    'an Analyst-Programmer': 'analyste-programmeur',
    'an AI Developer': 'développeur en intelligence artificielle',
    'a Full-Stack Developer': 'développeur full stack',
    'a Mobile Developer': 'développeur mobile',
    'Building web, mobile and applied AI solutions': 'Je développe des solutions web, mobiles et d’intelligence artificielle appliquée',
    'View My Work': 'Voir mes projets',
    'Get In Touch': 'Me contacter',
    'Scroll': 'Défiler',
    'About Me': 'À propos de moi',
    'Software, mobile and applied AI development': 'Développement logiciel, mobile et intelligence artificielle appliquée',
    'Analyst-Programmer & AI Developer': 'Analyste-programmeur et développeur en intelligence artificielle',
    'I bring more than three years of experience building web and mobile applications and machine-learning solutions. I work across the project lifecycle, from needs analysis and specifications to front-end and back-end development, API integration, testing and deployment.': 'J’ai plus de trois ans d’expérience dans le développement d’applications web et mobiles et de solutions d’apprentissage automatique. J’interviens à chaque étape d’un projet, de l’analyse des besoins et de la rédaction des spécifications au développement, à l’intégration d’API, aux tests et au déploiement.',
    'At Université du Québec à Chicoutimi, I contribute to': 'À l’Université du Québec à Chicoutimi, je contribue à',
    ", a research project building a real-time platform to collect synchronized data from five non-intrusive sensors and estimate pilots' cognitive state. My work spans the bilingual collection application, signal processing and machine-learning models.": ', un projet de recherche qui développe une plateforme en temps réel pour recueillir les données synchronisées de cinq capteurs non intrusifs et étudier l’état cognitif des pilotes. Mon travail porte sur l’application bilingue de collecte, le traitement des signaux et les modèles d’apprentissage automatique.',
    'Location:': 'Lieu :',
    'Email:': 'Courriel :',
    'Phone:': 'Téléphone :',
    'Degree:': 'Diplôme :',
    'Focus:': 'Spécialité :',
    'Freelance:': 'Mandats indépendants :',
    'M.Sc. in Computer Science (in progress)': 'Maîtrise en informatique (en cours)',
    'Software development & applied AI': 'Développement logiciel et IA appliquée',
    'Available': 'Disponible',
    'Projects': 'Projets',
    'Years Experience': 'Années d’expérience',
    'References': 'Références',
    'Credentials': 'Certifications',
    'Technical Skills': 'Compétences techniques',
    'Languages, frameworks and tools from my professional experience': 'Langages, frameworks et outils utilisés dans mon expérience professionnelle',
    'Programming Languages': 'Langages de programmation',
    'Web Development': 'Développement web',
    'Mobile Development': 'Développement mobile',
    'Machine Learning & Data': 'Apprentissage automatique et données',
    'Biosignal Processing & Computer Vision': 'Traitement des biosignaux et vision par ordinateur',
    'Databases': 'Bases de données',
    'Tools & Design': 'Outils et conception',
    'Professional experience, education and references': 'Expérience professionnelle, formation et références',
    'Professional Experience': 'Expérience professionnelle',
    'AI Developer & Research Assistant': 'Développeur en IA et assistant de recherche',
    'Jan 2025 – Present': 'janvier 2025 - aujourd’hui',
    'C-PILOT research project: real-time assessment of pilots’ cognitive state using non-intrusive sensors, in collaboration with CRIAQ, Bombardier and four Quebec universities.': 'Projet de recherche C-PILOT : étude en temps réel de l’état cognitif des pilotes à l’aide de capteurs non intrusifs, en collaboration avec le CRIAQ, Bombardier et quatre universités québécoises.',
    'Designed C-Pilot Collect, a bilingual Flask, Socket.IO, JavaScript and SQLite application that controls data collection in the X-Plane flight simulator and displays sensor signals in real time; packaged it as a Windows executable.': 'Conception de C-Pilot Collect, une application bilingue réalisée avec Flask, Socket.IO, JavaScript et SQLite. Elle pilote la collecte dans le simulateur de vol X-Plane, affiche les signaux en temps réel et est distribuée comme application Windows.',
    'Integrated and synchronized five sensors on a shared clock using Lab Streaming Layer and Bluetooth LE: EEG, ECG, PPG, thermal camera and eye tracking.': 'Intégration et synchronisation de cinq capteurs avec Lab Streaming Layer, Bluetooth LE et une horloge commune : EEG, ECG, PPG, caméra thermique et suivi oculaire.',
    'Built Python signal-processing and feature-extraction pipelines with NeuroKit2, MNE and SciPy; compared classical and deep-learning models, with Optuna tuning and SHAP interpretation.': 'Développement de pipelines Python de traitement du signal et d’extraction de caractéristiques avec NeuroKit2, MNE et SciPy. Comparaison de modèles classiques et d’apprentissage profond, réglage avec Optuna et interprétation avec SHAP.',
    'Mobile Developer': 'Développeur mobile',
    'UQAC, eVADID research project': 'UQAC, projet de recherche eVADID',
    'Nov 2025 – Present': 'novembre 2025 - aujourd’hui',
    'Developed the Flutter application': 'Développement de l’application Flutter',
    'to help teachers master classroom assessment.': 'pour aider le personnel enseignant à maîtriser l’évaluation en classe.',
    'Integrated and corrected the mobile API, carried out tests and production releases, and prepared technical reports and documentation.': 'Intégration et correction de l’API mobile, tests, mises en production et rédaction de rapports et de documentation technique.',
    'Mobile Developer & UI/UX Designer': 'Développeur mobile et concepteur UI/UX',
    'Jun 2022 – Dec 2023': 'juin 2022 - décembre 2023',
    'Wrote, updated and tested code in the Android environment and maintained existing applications.': 'Écriture, mise à jour et test de code pour Android, ainsi que maintenance d’applications existantes.',
    'Gathered user needs and prepared functional and technical specifications.': 'Recueil des besoins des utilisateurs et rédaction de spécifications fonctionnelles et techniques.',
    'Education': 'Formation',
    'M.Sc. in Computer Science': 'Maîtrise en informatique',
    'Master’s in Computer Science': 'Maîtrise en informatique',
    'Master\'s in Computer Science': 'Maîtrise en informatique',
    'In progress': 'En cours',
    'Professional Bachelor’s Degree': 'Licence professionnelle',
    'Professional Bachelor\'s Degree': 'Licence professionnelle',
    'Computer Science': 'Informatique',
    'Software Engineering': 'Génie logiciel',
    'CCNA Preparation': 'Préparation CCNA',
    'Certification preparation': 'Préparation à la certification',
    'Online program': 'Formation en ligne',
    'Certifications & Recognition': 'Certifications et distinctions',
    'Android Application Development': 'Développement d’applications Android',
    'Introduction to Flutter': 'Introduction à Flutter',
    'Service Certificate': 'Attestation de service',
    'CDEJ La Grâce: GesCDE, activity management and planning software': 'CDEJ La Grâce : GesCDE, logiciel de gestion et de planification des activités',
    'Languages': 'Langues',
    'French': 'Français',
    'Native': 'Langue maternelle',
    'English': 'Anglais',
    'Intermediate': 'Intermédiaire',
    'Professor Hamdi Ben Abdessalem': 'Professeur Hamdi Ben Abdessalem',
    'Research Director, C-PILOT': 'Directeur de recherche, C-PILOT',
    'Department of Computer Science and Mathematics, Université du Québec à Chicoutimi': 'Département d’informatique et de mathématique, Université du Québec à Chicoutimi',
    'ResearchGate profile': 'Profil ResearchGate',
    'Professor Claude Frasson': 'Professeur Claude Frasson',
    'Co-Director of Research, C-PILOT': 'Codirecteur de recherche, C-PILOT',
    'Department of Computer Science and Operations Research, Université de Montréal': 'Département d’informatique et de recherche opérationnelle, Université de Montréal',
    'Professor Nicole Monney': 'Professeure Nicole Monney',
    'eVADID Research Project': 'Projet de recherche eVADID',
    'Department of Education Sciences, Université du Québec à Chicoutimi': 'Département des sciences de l’éducation, Université du Québec à Chicoutimi',
    'My Recent Projects': 'Mes projets récents',
    'All': 'Tous',
    'Mobile App': 'Application mobile',
    'Web App': 'Application web',
    'Website': 'Site web',
    'AI & Data': 'IA et données',
    'UI/UX Design': 'Conception UI/UX',
    'C-PILOT Research Platform': 'Plateforme de recherche C-PILOT',
    'A real-time research platform for synchronized sensor collection and pilot cognitive-state research. The architecture combines a Flask and Socket.IO dashboard, Lab Streaming Layer recording, signal-processing pipelines and research models.': 'Une plateforme de recherche en temps réel pour collecter des données synchronisées et étudier l’état cognitif des pilotes. Elle réunit un tableau de bord Flask et Socket.IO, l’enregistrement avec Lab Streaming Layer, le traitement des signaux et des modèles de recherche.',
    'Neurosity Crown Monitor': 'Moniteur Neurosity Crown',
    'Real-time EEG monitoring for the Neurosity Crown headset: live calm, focus and brainwave charts over WebSocket, CSV session recording and an analysis viewer with temporal replay. Flask and Socket.IO, bilingual FR/EN.': 'Suivi EEG en temps réel avec le casque Neurosity Crown : affichage des mesures de calme, de concentration et des ondes cérébrales par WebSocket, enregistrement CSV et lecteur d’analyse avec relecture temporelle. Application bilingue en Flask et Socket.IO.',
    'Evadid': 'Evadid',
    'J’aime évaluer: a Flutter app built with UQAC researchers to help teachers master classroom assessment. Videos, podcasts and infographics across six themes, with offline progress tracking. On Google Play.': 'J’aime évaluer est une application Flutter développée avec des chercheurs de l’UQAC pour aider le personnel enseignant à maîtriser l’évaluation en classe. Elle propose des vidéos, balados et infographies sur six thèmes, avec suivi hors ligne de la progression. Disponible sur Google Play.',
    'Church member platform: SMS one-time-code sign-in, custom roles and permissions, role-based dashboards, spiritual follow-up, attendance sheets and assigned exercises. Laravel API with a React and TypeScript front end.': 'Plateforme destinée aux membres d’une église : connexion par code SMS, rôles et permissions, tableaux de bord adaptés, suivi pastoral, feuilles de présence et exercices. API Laravel et interface React avec TypeScript.',
    'Showcase website for the church, built with Astro as a static site: live YouTube service feed, photo gallery, tribe directory and PayPal donations.': 'Site vitrine de l’église réalisé avec Astro : diffusion des cultes YouTube, galerie photo, répertoire des tribus et dons par PayPal.',
    'Personal website for a pastor and author: sermons, service schedule, book and podcasts, plus an online donation page. Hand-coded static site with a Sharp-based image optimisation pipeline.': 'Site personnel d’un pasteur et auteur : prédications, horaires des cultes, livre, balados et dons en ligne. Site statique développé sur mesure avec un processus d’optimisation des images.',
    'Tech Event': 'Tech Event',
    'A mobile application developed using Flutter technology, directly interacting with a Flutter database. The primary objective is to provide a centralized platform where users can easily access a comprehensive list of planned technological events throughout the year.': 'Application mobile Flutter qui présente une liste centralisée des événements technologiques prévus pendant l’année et échange avec une base de données Firebase.',
    'Download': 'Télécharger',
    'eHome': 'eHome',
    'An application to sell or rent property': 'Application de vente et de location immobilière',
    'PayTicket': 'PayTicket',
    'Redesigned the PayTicket event ticket booking application': 'Refonte de l’interface de réservation de billets d’événements PayTicket',
    'Hupe': 'Hupe',
    'A bus ticket reservation and vehicle rental application': 'Application de réservation de billets d’autobus et de location de véhicules',
    'Bel Ice': 'Bel Ice',
    'E-commerce website for ice cream products': 'Site de commerce en ligne de produits glacés',
    'FastSOS': 'FastSOS',
    'An application that allows quick contact with emergency services': 'Application permettant de joindre rapidement les services d’urgence',
    'What I Can Do For You': 'Mes services',
    'Architecture': 'Architecture',
    'Applied AI and Machine Learning': 'IA appliquée et apprentissage automatique',
    'I build data-processing and machine-learning workflows for research projects. My C-PILOT work includes synchronized biosignals, feature extraction, model comparison and interpretation. Model results remain research estimates, with validation varying by target.': 'Je développe des outils de traitement des données et d’apprentissage automatique pour des projets de recherche. Dans C-PILOT, je travaille sur des biosignaux synchronisés, l’extraction de caractéristiques, la comparaison et l’interprétation de modèles. Les résultats sont des estimations de recherche et leur validation varie selon la cible.',
    'I develop Flutter applications for Android, from implementation and API integration to testing, release and technical documentation. My experience includes educational, event and service applications.': 'Je développe des applications Flutter pour Android, de la réalisation à l’intégration des API, aux tests, à la mise en production et à la documentation technique. Mon expérience comprend des applications éducatives, événementielles et de services.',
    'I build websites and web applications around the needs of each project, including showcase sites, e-commerce, management tools and real-time dashboards. My work covers front-end, back-end, API integration and deployment.': 'Je crée des sites et des applications web selon les besoins du projet : sites vitrines, commerce en ligne, outils de gestion et tableaux de bord en temps réel. Je travaille sur le front-end, le back-end, l’intégration des API et le déploiement.',
    'I turn user needs into clear interface flows and practical specifications, then design mobile and web screens that are easy to understand and use.': 'Je transforme les besoins des utilisateurs en parcours simples et en spécifications concrètes, puis je conçois des interfaces web et mobiles faciles à comprendre et à utiliser.',
    'Let’s Connect': 'Échangeons',
    'Let\'s Connect': 'Échangeons',
    'Call:': 'Téléphone :',
    'Your Name': 'Votre nom',
    'Your Email': 'Votre courriel',
    'Subject': 'Sujet',
    'Message': 'Message',
    'Loading': 'Envoi en cours',
    'Your message has been sent. Thank you!': 'Votre message a été envoyé. Merci !',
    'Send Message': 'Envoyer le message',
    'All Rights Reserved': 'Tous droits réservés',
    '. All Rights Reserved': '. Tous droits réservés',
    'Platform and model architecture': 'Architecture de la plateforme et des modèles',
    'Data collection': 'Collecte des données',
    'C-Pilot Collect uses Flask, Socket.IO, JavaScript and SQLite to manage sessions and show live signals. Inputs include X-Plane flight data, BMU network data, Neurosity Crown EEG, Polar ECG and PPG, a FLIR Lepton thermal camera and Gazepoint eye tracking.': 'C-Pilot Collect utilise Flask, Socket.IO, JavaScript et SQLite pour gérer les sessions et afficher les signaux en direct. Les entrées comprennent les données de vol X-Plane, les données réseau BMU, l’EEG Neurosity Crown, l’ECG et le PPG Polar, une caméra thermique FLIR Lepton et le suivi oculaire Gazepoint.',
    'Live data flow': 'Flux de données en direct',
    'Sensor workers send messages to an output queue and the central DataBus. One WebSocket publisher then streams updates through Socket.IO to the dashboard.': 'Les modules des capteurs envoient leurs messages dans une file de sortie, puis vers le DataBus central. Un seul diffuseur WebSocket transmet ensuite les mises à jour par Socket.IO au tableau de bord.',
    'Synchronization and storage': 'Synchronisation et stockage',
    'In parallel, native Lab Streaming Layer streams use a shared clock and are recorded by LSLRecorder. SQLite stores session, participant and scenario metadata. Session recordings keep raw files and LSL data separately.': 'En parallèle, les flux natifs Lab Streaming Layer partagent une horloge commune et sont enregistrés par LSLRecorder. SQLite conserve les métadonnées des sessions, des participants et des scénarios. Les fichiers bruts et les données LSL sont conservés séparément.',
    'Signal processing': 'Traitement des signaux',
    'Offline processing checks and cleans the recordings, builds timelines at 1 Hz or 10 Hz, then extracts features in 30 or 60 second windows. HRV features use 300 second windows.': 'Le traitement hors ligne vérifie et nettoie les enregistrements, crée des chronologies à 1 Hz ou 10 Hz, puis extrait des caractéristiques par fenêtres de 30 ou 60 secondes. Les caractéristiques HRV utilisent des fenêtres de 300 secondes.',
    'Research models': 'Modèles de recherche',
    'Model families studied include Ridge, Lasso, ElasticNet, SVR, Random Forest, LightGBM, XGBoost, CatBoost, 1D-CNN, TCN and GRU. Optuna supports tuning and SHAP supports interpretation.': 'Les familles de modèles étudiées comprennent Ridge, Lasso, ElasticNet, SVR, Random Forest, LightGBM, XGBoost, CatBoost, 1D-CNN, TCN et GRU. Optuna sert au réglage des paramètres et SHAP à l’interprétation.',
    'Research targets include workload, focus, fatigue, vigilance, engagement and selected stress or calm indicators, alongside measures such as SDNN and MeanNN. Model coverage and validation vary by target; outputs are research estimates.': 'Les cibles de recherche comprennent la charge de travail, la concentration, la fatigue, la vigilance, l’engagement et certains indicateurs de stress ou de calme, ainsi que des mesures comme SDNN et MeanNN. La couverture et la validation des modèles varient selon la cible; les résultats sont des estimations de recherche.',
    'The platform connects live sensor collection, synchronized recording and an offline research pipeline.': 'La plateforme relie la collecte en direct des capteurs, l’enregistrement synchronisé et un pipeline de recherche hors ligne.',
    'System map': 'Vue d’ensemble',
    'From synchronized sensors to research estimates': 'Des capteurs synchronisés aux estimations de recherche',
    'One collection layer serves two parallel data paths, followed by offline analysis.': 'Une même couche de collecte alimente deux voies de données parallèles, puis l’analyse hors ligne.',
    'Data sources': 'Sources de données',
    'Flight context': 'Données de vol',
    'Brain signals': 'Signaux cérébraux',
    'Cardiac signals': 'Signaux cardiaques',
    'Eye tracking': 'Suivi oculaire',
    'Thermal imaging': 'Imagerie thermique',
    'Collection layer': 'Couche de collecte',
    'Flask, JavaScript, Socket.IO, session control': 'Flask, JavaScript, Socket.IO, gestion des sessions',
    'Two parallel routes': 'Deux voies en parallèle',
    'Live path': 'Voie en direct',
    'Dashboard updates': 'Mise à jour du tableau de bord',
    'Sensor workers': 'Modules des capteurs',
    'Read incoming data': 'Lecture des données reçues',
    'Passes messages': 'Transmet les messages',
    'Central dispatch': 'Distribution centrale',
    'Single publisher': 'Diffuseur unique',
    'Live dashboard': 'Tableau de bord en direct',
    'Synchronized path': 'Voie synchronisée',
    'Session recording': 'Enregistrement des sessions',
    'Native LSL streams': 'Flux LSL natifs',
    'Sensor data streams': 'Flux des capteurs',
    'Shared clock': 'Horloge commune',
    'Aligns timestamps': 'Aligne les horodatages',
    'Records each session': 'Enregistre chaque session',
    'Session storage': 'Stockage des sessions',
    'Raw files, LSL data, SQLite metadata': 'Fichiers bruts, données LSL, métadonnées SQLite',
    'Recorded sessions': 'Sessions enregistrées',
    'Offline research': 'Recherche hors ligne',
    'Signal processing and model analysis': 'Traitement des signaux et analyse des modèles',
    'Session data': 'Données de session',
    'Recorded signals': 'Signaux enregistrés',
    'Quality checks': 'Contrôle qualité',
    'Validate and clean': 'Validation et nettoyage',
    'Timelines': 'Chronologies',
    '1 Hz or 10 Hz': '1 Hz ou 10 Hz',
    'Features': 'Caractéristiques',
    '30 s and 60 s; HRV 300 s': '30 s et 60 s; VFC 300 s',
    'Model analysis': 'Analyse des modèles',
    'Compare, tune and interpret': 'Comparaison, réglage et interprétation',
    'Research estimates': 'Estimations de recherche',
    'Workload, focus, fatigue and more': 'Charge de travail, concentration, fatigue et plus',
    'Model coverage and validation vary by target. Outputs are research estimates.': 'La couverture et la validation varient selon la cible. Les résultats sont des estimations de recherche.',
    'Architecture details': 'Détails de l’architecture'
  };

  const frenchAttributes = {
    alt: {
      'Florent Gotliebe': 'Florent Gotliebe',
      'Université du Québec à Chicoutimi': 'Université du Québec à Chicoutimi',
      'C-PILOT multimodal research platform': 'Plateforme de recherche multimodale C-PILOT'
    },
    title: {
      'Toggle theme': 'Changer de thème',
      'Close': 'Fermer',
      'View architecture': 'Voir l’architecture',
      'View C-PILOT platform and model architecture': 'Voir l’architecture de la plateforme et des modèles C-PILOT',
      'View on GitHub': 'Voir sur GitHub',
      'View Evadid on Google Play': 'Voir Evadid sur Google Play',
      'View PayTicket on Google Play': 'Voir PayTicket sur Google Play',
      'View Hupe on Google Play': 'Voir Hupe sur Google Play',
      'Visit Website': 'Visiter le site web',
      'Visit the website': 'Visiter le site web',
      'Download': 'Télécharger'
    },
    'aria-label': {
      'Toggle theme': 'Changer de thème',
      'Close': 'Fermer',
      'View C-PILOT platform and model architecture': 'Voir l’architecture de la plateforme et des modèles C-PILOT',
      'View Evadid on Google Play': 'Voir Evadid sur Google Play',
      'View PayTicket on Google Play': 'Voir PayTicket sur Google Play',
      'View Hupe on Google Play': 'Voir Hupe sur Google Play',
      'Visit Pastor Abraham Andebi’s website': 'Visiter le site du pasteur Abraham Andebi'
    },
    placeholder: {
      'Your Name': 'Votre nom',
      'Your Email': 'Votre courriel',
      'Subject': 'Sujet',
      'Message': 'Message'
    }
  };

  const originalText = new Map();
  const originalAttributes = new Map();
  const normalize = value => value.trim().replace(/\s+/g, ' ');
  const pageCopy = {
    en: {
      title: 'Florent Gotliebe AKPA | Software & AI Developer',
      description: 'Software and AI developer in Chicoutimi, Canada. I build web and mobile applications and applied machine-learning systems, including the C-PILOT research project.',
      socialDescription: 'Software and AI developer in Chicoutimi, Canada. Web, mobile and applied machine-learning projects, including C-PILOT.'
    },
    fr: {
      title: 'Florent Gotliebe AKPA | Développeur logiciel et IA',
      description: 'Développeur logiciel et IA à Chicoutimi, au Canada. Applications web et mobiles, apprentissage automatique appliqué et projet de recherche C-PILOT.',
      socialDescription: 'Développeur logiciel et IA à Chicoutimi, au Canada. Projets web, mobiles et d’apprentissage automatique appliqué, dont C-PILOT.'
    }
  };

  function saveOriginalContent() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement.closest('script, style, noscript')) originalText.set(node, node.nodeValue);
    }

    document.querySelectorAll('body *').forEach(element => {
      const saved = {};
      ['alt', 'title', 'aria-label', 'placeholder'].forEach(attribute => {
        if (element.hasAttribute(attribute)) saved[attribute] = element.getAttribute(attribute);
      });
      if (Object.keys(saved).length) originalAttributes.set(element, saved);
    });
  }

  function translateTextNodes(language) {
    originalText.forEach((original, node) => {
      if (!node.isConnected) return;
      if (language === 'en') {
        node.nodeValue = original;
        return;
      }

      const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const phrase = normalize(match[2]);
      const translated = frenchText[phrase] || frenchText[phrase.replace(/'/g, '’')] || frenchText[phrase.replace(/[’‘]/g, "'")];
      if (translated) node.nodeValue = `${match[1]}${translated}${match[3]}`;
    });
  }

  function translateAttributes(language) {
    originalAttributes.forEach((saved, element) => {
      Object.entries(saved).forEach(([attribute, original]) => {
        if (language === 'en') {
          element.setAttribute(attribute, original);
          return;
        }
        const translations = frenchAttributes[attribute];
        const translation = translations?.[original]
          || translations?.[original.replace(/'/g, '’')]
          || translations?.[original.replace(/[’‘]/g, "'")];
        if (translation) element.setAttribute(attribute, translation);
      });
    });
  }

  function setPageMetadata(language) {
    const copy = pageCopy[language];
    document.title = copy.title;
    document.documentElement.lang = language === 'fr' ? 'fr-CA' : 'en-CA';
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.socialDescription);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'fr' ? 'fr_CA' : 'en_CA');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', copy.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', copy.socialDescription);
  }

  function updateTypedItems(language) {
    const typed = document.querySelector('.typed');
    if (!typed) return;
    typed.setAttribute('data-typed-items', language === 'fr'
      ? 'analyste-programmeur, développeur en intelligence artificielle, développeur full stack, développeur mobile'
      : 'an Analyst-Programmer, an AI Developer, a Full-Stack Developer, a Mobile Developer');
  }

  function applyLanguage(language, remember = true) {
    const selected = language === 'fr' ? 'fr' : 'en';
    translateTextNodes(selected);
    translateAttributes(selected);
    setPageMetadata(selected);
    updateTypedItems(selected);

    const toggle = document.getElementById('languageToggle');
    if (toggle) {
      toggle.textContent = selected === 'fr' ? 'EN' : 'FR';
      toggle.setAttribute('aria-label', selected === 'fr' ? 'Switch to English' : 'Passer en français');
      toggle.setAttribute('title', selected === 'fr' ? 'Switch to English' : 'Passer en français');
    }

    if (remember) {
      try { localStorage.setItem('gotflo-language', selected); } catch (error) { /* Storage may be disabled. */ }
    }
    window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language: selected } }));
  }

  saveOriginalContent();
  let initialLanguage = 'en';
  try {
    if (localStorage.getItem('gotflo-language') === 'fr') initialLanguage = 'fr';
  } catch (error) { /* Keep English when storage is disabled. */ }
  applyLanguage(initialLanguage, false);

  document.getElementById('languageToggle')?.addEventListener('click', () => {
    applyLanguage(document.documentElement.lang.startsWith('fr') ? 'en' : 'fr');
  });
})();
