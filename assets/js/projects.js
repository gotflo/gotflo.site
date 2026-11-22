/**
 * Project details shown in the portfolio panel.
 *
 * Each entry is keyed by the data-project value on the matching card in
 * index.html. Text is stored per language so the panel can be rebuilt when the
 * visitor switches between English and French.
 *
 * link.kind drives the icon and the default label: appstore, playstore, github,
 * website, download, video, architecture.
 */
window.PORTFOLIO_PROJECTS = {

  cpilot: {
    cover: 'assets/img/portfolio/cpilot-collect.jpg',
    gallery: ['assets/img/portfolio/cpilot-collect.jpg'],
    demo: 'cpilot',
    links: [
      { kind: 'architecture', target: '#cpilotArchitecture' }
    ],
    en: {
      title: 'C-PILOT Research Platform',
      kicker: 'Research platform',
      period: 'January 2025 to today',
      role: 'AI developer and research assistant, UQAC',
      caption: 'Real-time overview of C-Pilot Collect with the five sensors streaming.',
      summary: 'C-PILOT studies the cognitive state of pilots from non-intrusive sensors, at UQAC with CRIAQ, Bombardier and four Quebec universities. I designed C-Pilot Collect, the bilingual application that runs a session, keeps every sensor on one clock and feeds the research pipeline.',
      highlights: [
        'Five sensors on a shared clock through Lab Streaming Layer and Bluetooth LE: EEG, ECG, PPG, thermal camera and eye tracking, alongside X-Plane flight data and the BMU network.',
        'Sensor workers push into an output queue and a central DataBus; one WebSocket publisher streams the dashboard, while LSLRecorder writes the synchronized session in parallel.',
        'Offline pipeline in Python: quality checks, timelines at 1 Hz or 10 Hz, features over 30 and 60 second windows, heart-rate variability over 300 seconds.',
        'Model comparison across Ridge, Lasso, ElasticNet, SVR, Random Forest, LightGBM, XGBoost, CatBoost, 1D-CNN, TCN and GRU, tuned with Optuna and read with SHAP.',
        'Bilingual interface and a packaged Windows build so the team can run a session without a Python setup.'
      ],
      stack: ['Python', 'Flask', 'Socket.IO', 'JavaScript', 'SQLite', 'Lab Streaming Layer', 'NeuroKit2', 'MNE', 'SciPy', 'PyTorch', 'Optuna', 'SHAP'],
      note: 'Model coverage and validation vary by target. Outputs are research estimates, not a clinical or certified measurement.'
    },
    fr: {
      title: 'Plateforme de recherche C-PILOT',
      kicker: 'Plateforme de recherche',
      period: 'Janvier 2025 à aujourd’hui',
      role: 'Développeur en IA et assistant de recherche, UQAC',
      caption: 'Vue d’ensemble de C-Pilot Collect avec les cinq capteurs en diffusion.',
      summary: 'C-PILOT étudie l’état cognitif des pilotes à partir de capteurs non intrusifs, à l’UQAC avec le CRIAQ, Bombardier et quatre universités québécoises. J’ai conçu C-Pilot Collect, l’application bilingue qui pilote une séance, garde tous les capteurs sur une même horloge et alimente la chaîne de traitement.',
      highlights: [
        'Cinq capteurs sur une horloge commune avec Lab Streaming Layer et Bluetooth LE : EEG, ECG, PPG, caméra thermique et suivi oculaire, en plus des données de vol X-Plane et du réseau BMU.',
        'Les modules capteurs écrivent dans une file de sortie puis dans un DataBus central ; un seul diffuseur WebSocket alimente le tableau de bord, pendant que LSLRecorder enregistre la séance synchronisée.',
        'Chaîne hors ligne en Python : contrôle qualité, chronologies à 1 Hz ou 10 Hz, caractéristiques sur fenêtres de 30 et 60 secondes, variabilité cardiaque sur 300 secondes.',
        'Comparaison de modèles Ridge, Lasso, ElasticNet, SVR, forêt aléatoire, LightGBM, XGBoost, CatBoost, 1D-CNN, TCN et GRU, réglés avec Optuna et interprétés avec SHAP.',
        'Interface bilingue et exécutable Windows pour que l’équipe lance une séance sans installer Python.'
      ],
      stack: ['Python', 'Flask', 'Socket.IO', 'JavaScript', 'SQLite', 'Lab Streaming Layer', 'NeuroKit2', 'MNE', 'SciPy', 'PyTorch', 'Optuna', 'SHAP'],
      note: 'La couverture et la validation varient selon la cible. Les sorties sont des estimations de recherche, pas une mesure clinique ou certifiée.'
    }
  },

  neurosity: {
    cover: 'assets/img/portfolio/neurosity-monitor.jpg',
    gallery: ['assets/img/portfolio/neurosity-monitor.jpg'],
    demo: 'neurosity',
    links: [
      { kind: 'github', url: 'https://github.com/gotflo/neurosity_monitor' }
    ],
    en: {
      title: 'Neurosity Crown Monitor',
      kicker: 'Desktop web application',
      period: '2025',
      role: 'Design and development',
      caption: 'Live session: calm and focus, frequency bands and the eight raw EEG channels.',
      summary: 'A monitoring application for the Neurosity Crown headset. It shows calm, focus, the five frequency bands and the eight raw EEG channels as they arrive, records a session to CSV and lets you replay it afterwards.',
      highlights: [
        'Live readings over WebSocket: calm and focus rings, delta, theta, alpha, beta and gamma, and the eight raw channels at 256 Hz.',
        'Electrode contact quality shown on a head map, with battery level and connection state in the header.',
        'Session recording to CSV with mean, minimum, maximum and standard deviation per band, plus a built-in file manager to download past sessions.',
        'Analysis viewer that replays a recorded session along its timeline.',
        'Bilingual French and English interface, encrypted credential storage, packaged as a Windows build.'
      ],
      stack: ['Python', 'Flask', 'Socket.IO', 'Neurosity SDK', 'Chart.js', 'Canvas', 'Pandas'],
      note: ''
    },
    fr: {
      title: 'Moniteur Neurosity Crown',
      kicker: 'Application web de bureau',
      period: '2025',
      role: 'Conception et développement',
      caption: 'Séance en direct : calme et concentration, bandes de fréquence et les huit voies EEG brutes.',
      summary: 'Une application de suivi pour le casque Neurosity Crown. Elle affiche le calme, la concentration, les cinq bandes de fréquence et les huit voies EEG brutes au fil de leur arrivée, enregistre une séance en CSV et permet de la relire ensuite.',
      highlights: [
        'Mesures en direct par WebSocket : anneaux de calme et de concentration, delta, thêta, alpha, bêta et gamma, et les huit voies brutes à 256 Hz.',
        'Qualité de contact des électrodes sur une carte de la tête, avec le niveau de batterie et l’état de connexion dans l’en-tête.',
        'Enregistrement de séance en CSV avec moyenne, minimum, maximum et écart type par bande, et un gestionnaire de fichiers pour télécharger les séances passées.',
        'Lecteur d’analyse qui rejoue une séance enregistrée le long de sa chronologie.',
        'Interface bilingue français et anglais, identifiants chiffrés, distribution en exécutable Windows.'
      ],
      stack: ['Python', 'Flask', 'Socket.IO', 'SDK Neurosity', 'Chart.js', 'Canvas', 'Pandas'],
      note: ''
    }
  },

  evadid: {
    cover: 'assets/img/portfolio/evadid.jpg',
    gallery: ['assets/img/portfolio/evadid.jpg'],
    links: [
      { kind: 'appstore', url: 'https://apps.apple.com/us/app/jaime-%C3%A9valuer/id6824184352' },
      { kind: 'playstore', url: 'https://play.google.com/store/apps/details?id=ca.jaimeevaluer.evadid' }
    ],
    en: {
      title: 'J’aime évaluer',
      kicker: 'Mobile application',
      period: 'November 2025 to today, published September 2026',
      role: 'Mobile developer, eVADID research project, UQAC',
      caption: 'The J’aime évaluer application, built with the eVADID research team.',
      summary: 'A free Flutter application built with the eVADID research team at UQAC, led by Professor Nicole Monney. It gives teachers a library of classroom assessment practices: videos, audio podcasts and infographics across the six stages of the assessment cycle.',
      highlights: [
        'Six themes covering professional judgement, planning, data collection, interpretation, feedback and communication.',
        'Videos, podcasts and infographics, with progress kept on the device so a teacher can pick up where they left off.',
        'No account to create and no personal data collected.',
        'I integrated and corrected the mobile API, ran the tests and handled the releases on both stores.',
        'Technical reports and documentation written for the research team.'
      ],
      stack: ['Flutter', 'Dart', 'REST API', 'Android', 'iOS'],
      note: 'Published by the eVADID team, Université du Québec à Chicoutimi.'
    },
    fr: {
      title: 'J’aime évaluer',
      kicker: 'Application mobile',
      period: 'Novembre 2025 à aujourd’hui, publiée en septembre 2026',
      role: 'Développeur mobile, projet de recherche eVADID, UQAC',
      caption: 'L’application J’aime évaluer, réalisée avec l’équipe de recherche eVADID.',
      summary: 'Une application Flutter gratuite réalisée avec l’équipe de recherche eVADID de l’UQAC, dirigée par la professeure Nicole Monney. Elle offre au personnel enseignant une bibliothèque de pratiques d’évaluation en classe : vidéos, balados et infographies sur les six étapes du cycle de l’évaluation.',
      highlights: [
        'Six thèmes qui couvrent le jugement professionnel, la planification, la prise d’information, l’interprétation, la rétroaction et la communication.',
        'Vidéos, balados et infographies, avec une progression conservée sur l’appareil pour reprendre là où l’on s’est arrêté.',
        'Aucun compte à créer et aucune donnée personnelle recueillie.',
        'J’ai intégré et corrigé l’API mobile, mené les tests et assuré les publications sur les deux magasins.',
        'Rapports techniques et documentation rédigés pour l’équipe de recherche.'
      ],
      stack: ['Flutter', 'Dart', 'API REST', 'Android', 'iOS'],
      note: 'Publiée par l’équipe eVADID, Université du Québec à Chicoutimi.'
    }
  },

  'evh-platform': {
    cover: 'assets/img/portfolio/evh-platform.jpg',
    gallery: ['assets/img/portfolio/evh-platform.jpg'],
    demo: 'evh',
    demoTitle: { en: 'Roles and scopes', fr: 'Rôles et périmètres' },
    demoHint: false,
    links: [],
    en: {
      title: 'Espace Vases d’Honneur',
      kicker: 'Web platform',
      period: '2026',
      role: 'Design and full-stack development',
      caption: 'Member dashboard: verse of the moment, monthly tasks, attendance figures and the week ahead.',
      summary: 'A member platform for the Vases d’Honneur Chicoutimi church. Each member has a personal space; those in charge follow church life inside their own scope, whether that is a small group, a tribe, a department or the whole church.',
      highlights: [
        'Sign-in by phone with a one-time code sent by SMS, so there is no password to manage.',
        'Roles and permissions with a scope attached: whole church, tribe, small group or a single member. Nine roles from resident pastor to member.',
        'Personal space with a profile completion indicator, family links, monthly spiritual health form, monthly resolutions, weekly assignment and a self-assessment questionnaire.',
        'Attendance sheets, assigned exercises, appointments with the pastor, calendar with events, holidays, birthdays and anniversaries.',
        'Monthly reports with PDF export generated on the device, scheduled reminders, audit log, in-app notifications and web push.',
        'Installable as a progressive web app, served by Laravel together with the API.'
      ],
      stack: ['Laravel 13', 'PHP 8.3', 'Sanctum', 'React 19', 'TypeScript', 'Vite', 'MySQL', 'SQLite', 'Web Push', 'pdfmake'],
      note: 'The screenshot comes from a local development copy filled with test accounts. No member data is shown.'
    },
    fr: {
      title: 'Espace Vases d’Honneur',
      kicker: 'Plateforme web',
      period: '2026',
      role: 'Conception et développement complet',
      caption: 'Tableau de bord d’un membre : parole du moment, tâches du mois, effectifs et semaine à venir.',
      summary: 'Une plateforme destinée aux membres de l’église Vases d’Honneur Chicoutimi. Chaque fidèle a son espace personnel ; les responsables suivent la vie de l’église dans leur propre périmètre, qu’il s’agisse d’un GEM, d’une tribu, d’un département ou de toute l’église.',
      highlights: [
        'Connexion par téléphone avec un code à usage unique envoyé par SMS, donc aucun mot de passe à gérer.',
        'Rôles et permissions avec un périmètre : église entière, tribu, GEM ou un seul membre. Neuf rôles, du pasteur résident au membre.',
        'Espace personnel avec indicateur de complétion du profil, liens familiaux, fiche de santé spirituelle mensuelle, résolutions du mois, devoir de la semaine et questionnaire d’auto-évaluation.',
        'Feuilles de présence, exercices assignés, rendez-vous avec le pasteur, calendrier des événements, jours fériés, anniversaires de naissance et de mariage.',
        'Rapports mensuels avec export PDF produit sur l’appareil, rappels planifiés, journal d’audit, notifications dans l’application et push web.',
        'Installable comme application web progressive, servie par Laravel en même temps que l’API.'
      ],
      stack: ['Laravel 13', 'PHP 8.3', 'Sanctum', 'React 19', 'TypeScript', 'Vite', 'MySQL', 'SQLite', 'Push web', 'pdfmake'],
      note: 'La capture provient d’une copie de développement locale remplie de comptes de test. Aucune donnée de membre n’est affichée.'
    }
  },

  'evh-site': {
    cover: 'assets/img/portfolio/evh-site.jpg',
    gallery: ['assets/img/portfolio/evh-site.jpg'],
    links: [
      { kind: 'website', url: 'https://vasesdhonneurchicoutimi.org' }
    ],
    en: {
      title: 'Vases d’Honneur Chicoutimi',
      kicker: 'Website',
      period: '2025',
      role: 'Design and development',
      caption: 'Home page of the church website.',
      summary: 'The public website of the church, built with Astro as a static site so it stays fast and cheap to host.',
      highlights: [
        'Live YouTube feed of the services, with past recordings kept available.',
        'Photo gallery, tribe directory and service schedule.',
        'Online giving through PayPal.',
        'Static build with optimised images, so pages load quickly on a phone connection.'
      ],
      stack: ['Astro', 'JavaScript', 'HTML', 'CSS', 'YouTube API', 'PayPal'],
      note: ''
    },
    fr: {
      title: 'Vases d’Honneur Chicoutimi',
      kicker: 'Site web',
      period: '2025',
      role: 'Conception et développement',
      caption: 'Page d’accueil du site de l’église.',
      summary: 'Le site public de l’église, réalisé avec Astro en site statique pour rester rapide et peu coûteux à héberger.',
      highlights: [
        'Diffusion des cultes par YouTube, avec les enregistrements précédents toujours accessibles.',
        'Galerie photo, répertoire des tribus et horaire des cultes.',
        'Dons en ligne par PayPal.',
        'Génération statique avec images optimisées, pour un chargement rapide sur une connexion mobile.'
      ],
      stack: ['Astro', 'JavaScript', 'HTML', 'CSS', 'API YouTube', 'PayPal'],
      note: ''
    }
  },

  'pasteur-abraham': {
    cover: 'assets/img/portfolio/pasteur-abraham.jpg',
    gallery: ['assets/img/portfolio/pasteur-abraham.jpg'],
    links: [
      { kind: 'website', url: 'https://abrahamandebi.com/' },
      { kind: 'github', url: 'https://github.com/gotflo/pasteur_abraham' }
    ],
    en: {
      title: 'Pasteur Abraham Andebi',
      kicker: 'Website',
      period: '2025',
      role: 'Design and development',
      caption: 'Personal website of Pastor Abraham Andebi.',
      summary: 'A personal website for a pastor and author: his sermons, service schedule, book and podcasts, with an online giving page.',
      highlights: [
        'Hand-coded static site, no content management system to maintain.',
        'Image pipeline built on Sharp, which produces the responsive sizes at build time.',
        'Sermon and podcast listings, service schedule and a page for the book.',
        'Online giving page.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Sharp'],
      note: ''
    },
    fr: {
      title: 'Pasteur Abraham Andebi',
      kicker: 'Site web',
      period: '2025',
      role: 'Conception et développement',
      caption: 'Site personnel du pasteur Abraham Andebi.',
      summary: 'Un site personnel pour un pasteur et auteur : ses prédications, l’horaire des cultes, son livre et ses balados, avec une page de dons en ligne.',
      highlights: [
        'Site statique développé sur mesure, sans système de gestion de contenu à entretenir.',
        'Chaîne d’optimisation des images avec Sharp, qui produit les différentes tailles au moment de la génération.',
        'Listes de prédications et de balados, horaire des cultes et page dédiée au livre.',
        'Page de dons en ligne.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Sharp'],
      note: ''
    }
  },

  'tech-event': {
    cover: 'assets/img/portfolio/first.png',
    gallery: ['assets/img/portfolio/first.png'],
    links: [
      { kind: 'github', url: 'https://github.com/gotflo/tech_event' },
      { kind: 'download', url: 'https://github.com/gotflo/tech_event/releases/download/tech_event/tech_event.apk' }
    ],
    en: {
      title: 'Tech Event',
      kicker: 'Mobile application',
      period: '2023',
      role: 'Design and development',
      caption: 'Tech Event, the technology event directory.',
      summary: 'A Flutter application that gathers the technology events planned for the year in one place, so they are easy to browse and follow.',
      highlights: [
        'Event list kept in Firebase and updated without republishing the application.',
        'Event detail with date, place and description.',
        'Search and filtering to find an event quickly.',
        'Android build published as a downloadable APK on the repository releases.'
      ],
      stack: ['Flutter', 'Dart', 'Firebase', 'Android'],
      note: ''
    },
    fr: {
      title: 'Tech Event',
      kicker: 'Application mobile',
      period: '2023',
      role: 'Conception et développement',
      caption: 'Tech Event, le répertoire des événements technologiques.',
      summary: 'Une application Flutter qui réunit au même endroit les événements technologiques prévus dans l’année, pour les parcourir et les suivre facilement.',
      highlights: [
        'Liste des événements conservée dans Firebase et mise à jour sans republier l’application.',
        'Fiche d’événement avec la date, le lieu et la description.',
        'Recherche et filtres pour trouver rapidement un événement.',
        'Version Android publiée en APK téléchargeable dans les versions du dépôt.'
      ],
      stack: ['Flutter', 'Dart', 'Firebase', 'Android'],
      note: ''
    }
  },

  ehome: {
    cover: 'assets/img/portfolio/ehome.png',
    gallery: ['assets/img/portfolio/ehome.png'],
    links: [],
    en: {
      title: 'eHome',
      kicker: 'Mobile application',
      period: '2022',
      role: 'Development and interface design',
      caption: 'eHome, property search on mobile.',
      summary: 'A mobile application for selling and renting property, with listings, photos and a direct line to the person offering the place.',
      highlights: [
        'Property listings with photos, price and location.',
        'Search by type of property, budget and area.',
        'Contact flow between the person looking and the person offering.'
      ],
      stack: ['Flutter', 'Dart', 'Firebase', 'Android'],
      note: ''
    },
    fr: {
      title: 'eHome',
      kicker: 'Application mobile',
      period: '2022',
      role: 'Développement et conception des écrans',
      caption: 'eHome, la recherche de logement sur mobile.',
      summary: 'Une application mobile de vente et de location immobilière, avec les annonces, les photos et une mise en relation directe avec la personne qui propose le bien.',
      highlights: [
        'Annonces avec photos, prix et localisation.',
        'Recherche par type de bien, budget et secteur.',
        'Mise en relation entre la personne qui cherche et celle qui propose.'
      ],
      stack: ['Flutter', 'Dart', 'Firebase', 'Android'],
      note: ''
    }
  },

  payticket: {
    cover: 'assets/img/portfolio/payticket.png',
    gallery: ['assets/img/portfolio/payticket.png'],
    links: [
      { kind: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.roserio.payticket' }
    ],
    en: {
      title: 'PayTicket',
      kicker: 'Interface design',
      period: '2023',
      role: 'UI and UX design',
      caption: 'Redesigned booking screens for PayTicket.',
      summary: 'A redesign of the PayTicket event ticket booking application, carried out at IT-INNOVATION.',
      highlights: [
        'Rework of the booking flow, from finding an event to holding the ticket.',
        'New screen layouts and a consistent component set.',
        'Specifications handed to the development team.'
      ],
      stack: ['Figma', 'UI design', 'UX design', 'Android'],
      note: ''
    },
    fr: {
      title: 'PayTicket',
      kicker: 'Conception d’interface',
      period: '2023',
      role: 'Conception UI et UX',
      caption: 'Écrans de réservation repensés pour PayTicket.',
      summary: 'Une refonte de l’application de réservation de billets d’événements PayTicket, réalisée chez IT-INNOVATION.',
      highlights: [
        'Reprise du parcours de réservation, de la recherche d’un événement jusqu’au billet en main.',
        'Nouvelles maquettes d’écrans et jeu de composants cohérent.',
        'Spécifications remises à l’équipe de développement.'
      ],
      stack: ['Figma', 'Conception UI', 'Conception UX', 'Android'],
      note: ''
    }
  },

  hupe: {
    cover: 'assets/img/portfolio/hupe.png',
    gallery: ['assets/img/portfolio/hupe.png'],
    links: [
      { kind: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.komaltech.hupe' }
    ],
    en: {
      title: 'Hupe',
      kicker: 'Mobile application',
      period: '2023',
      role: 'Mobile development, IT-INNOVATION',
      caption: 'Hupe, bus tickets and vehicle rental.',
      summary: 'An application for booking bus tickets and renting vehicles, published on Google Play.',
      highlights: [
        'Route search with departure times and seat selection.',
        'Vehicle rental alongside ticket booking.',
        'Booking history and tickets kept in the application.'
      ],
      stack: ['Android', 'Java', 'REST API'],
      note: ''
    },
    fr: {
      title: 'Hupe',
      kicker: 'Application mobile',
      period: '2023',
      role: 'Développement mobile, IT-INNOVATION',
      caption: 'Hupe, billets d’autobus et location de véhicules.',
      summary: 'Une application de réservation de billets d’autobus et de location de véhicules, publiée sur Google Play.',
      highlights: [
        'Recherche de trajets avec les heures de départ et le choix des places.',
        'Location de véhicules en complément de la réservation de billets.',
        'Historique des réservations et billets conservés dans l’application.'
      ],
      stack: ['Android', 'Java', 'API REST'],
      note: ''
    }
  },

  belice: {
    cover: 'assets/img/portfolio/belice.png',
    gallery: ['assets/img/portfolio/belice.png'],
    links: [
      { kind: 'website', url: 'https://belice.netlify.app/' }
    ],
    en: {
      title: 'Bel Ice',
      kicker: 'Online shop',
      period: '2022',
      role: 'Design and front-end development',
      caption: 'Bel Ice, the ice cream shop front.',
      summary: 'An online shop for ice cream products, with the catalogue, the cart and the order flow.',
      highlights: [
        'Product catalogue organised by range.',
        'Cart and order flow.',
        'Responsive layout for phone and desktop.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      note: ''
    },
    fr: {
      title: 'Bel Ice',
      kicker: 'Boutique en ligne',
      period: '2022',
      role: 'Conception et développement front-end',
      caption: 'Bel Ice, la vitrine de la boutique de glaces.',
      summary: 'Une boutique en ligne de produits glacés, avec le catalogue, le panier et le parcours de commande.',
      highlights: [
        'Catalogue de produits organisé par gamme.',
        'Panier et parcours de commande.',
        'Mise en page adaptée au téléphone comme à l’ordinateur.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      note: ''
    }
  },

  fastsos: {
    cover: 'assets/img/portfolio/fastSoS.png',
    gallery: ['assets/img/portfolio/fastSoS.png'],
    links: [],
    en: {
      title: 'FastSOS',
      kicker: 'Mobile application',
      period: '2022',
      role: 'Development and interface design',
      caption: 'FastSOS, reaching emergency services in one tap.',
      summary: 'An application that puts the emergency services one tap away, with the right number for the situation and the caller’s location ready to share.',
      highlights: [
        'Direct call to the service that matches the situation.',
        'Location ready to pass on to the responder.',
        'Interface designed to stay readable under stress.'
      ],
      stack: ['Flutter', 'Dart', 'Android'],
      note: ''
    },
    fr: {
      title: 'FastSOS',
      kicker: 'Application mobile',
      period: '2022',
      role: 'Développement et conception des écrans',
      caption: 'FastSOS, joindre les secours en une touche.',
      summary: 'Une application qui met les services d’urgence à une touche, avec le bon numéro selon la situation et la position de la personne prête à être transmise.',
      highlights: [
        'Appel direct vers le service qui correspond à la situation.',
        'Position prête à transmettre à l’intervenant.',
        'Interface pensée pour rester lisible dans l’urgence.'
      ],
      stack: ['Flutter', 'Dart', 'Android'],
      note: ''
    }
  }
};
