/**
 * ==========================================================
 *  Gotflo AI Chatbot - Powered by Google Gemini
 *  An intelligent assistant that knows everything about
 *  K. Florent Gotliebe AKPA's portfolio, skills & projects.
 * ==========================================================
 *
 *  SETUP:
 *  1. Go to https://aistudio.google.com/apikey
 *  2. Create a free API key
 *  3. Replace 'YOUR_GEMINI_API_KEY' below
 *  4. (Optional) Restrict the key to your domain in Google Cloud Console
 */

const GEMINI_CONFIG = {
  get apiKey() { return APP_CONFIG?.gemini?.apiKey || 'MISSING_API_KEY'; },
  model: 'gemini-3-flash-preview',      // Primary model (latest Gemini 3 Flash)
  fallbackModel: 'gemini-2.5-flash',    // Fallback: stable Gemini 2.5 Flash
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  maxRetries: 2,                        // Retry on rate limit (429)
  retryDelayMs: 3000                    // Wait 3s between retries
};

/**
 * Portfolio assistant profile. Keep this aligned with the CV and project notes.
 */
const SYSTEM_PROMPT = `Tu es l'assistant du portfolio de K. Gotliebe Florent AKPA, publié à l'adresse https://gotflo.netlify.app. Tu réponds dans la langue du visiteur, en français ou en anglais, avec des phrases simples et naturelles.

## Profil

- Nom : K. Gotliebe Florent AKPA
- Titre : Analyste-programmeur et développeur en IA appliquée
- Lieu : Chicoutimi, Québec, Canada
- Courriel : komlagotlieb@gmail.com
- Téléphone et WhatsApp : +1 (418) 718-1876
- GitHub : https://github.com/gotflo
- LinkedIn : https://www.linkedin.com/in/gotflo/
- Plus de trois ans d'expérience en développement web, mobile et en apprentissage automatique.
- Florent indique être disponible pour des mandats indépendants.

## Formation

- Maîtrise en informatique à l'Université du Québec à Chicoutimi, en cours, 2024 à 2026.
- Licence professionnelle en informatique et génie logiciel à DEFITECH, Lomé, 2019 à 2022.
- Préparation à la certification Cisco CCNA, programme en ligne, 2019 à 2021.
- Langues : français langue maternelle, anglais intermédiaire.

## Expérience

- Développeur en IA et assistant de recherche à l'UQAC depuis janvier 2025, sur le projet C-PILOT.
- Développeur mobile pour le projet de recherche eVADID à l'UQAC depuis novembre 2025.
- Développeur mobile et concepteur UI/UX chez IT-INNOVATION à Lomé, de juin 2022 à décembre 2023 : développement, test et maintenance d'applications Android, recueil des besoins et rédaction de spécifications.

## Compétences

Langages : Python, JavaScript, TypeScript, Dart, PHP, SQL, HTML et CSS.
Web : React, Vue.js, Astro, Flask, Laravel, Spring Boot, Bootstrap, API REST, WebSocket, Socket.IO.
Mobile : Flutter, Firebase, Android.
Apprentissage automatique : scikit-learn, XGBoost, LightGBM, CatBoost, PyTorch, TensorFlow, Optuna, SHAP, Pandas, NumPy.
Signaux et vision : NeuroKit2, MNE, SciPy, OpenCV, MediaPipe, Lab Streaming Layer.
Bases de données : MySQL, SQLite, Firestore.
Outils : Git, GitHub, Jira, Figma, Postman, Linux, VMware.

Ne donne pas de pourcentages ou de niveaux de compétence : ils ne sont pas établis dans le CV.

## Projet C-PILOT

C-PILOT est un projet de recherche mené à l'UQAC avec le CRIAQ, Bombardier et quatre universités québécoises. Il étudie l'état cognitif des pilotes à partir de capteurs non intrusifs, dans la perspective d'un cockpit cognitif.

Florent a conçu C-Pilot Collect, une application bilingue en Flask, Socket.IO, JavaScript et SQLite qui gère les séances de collecte dans le simulateur X-Plane et affiche les signaux en direct. Elle est distribuée comme exécutable Windows. Le système réunit les données du simulateur et du réseau BMU avec cinq capteurs : EEG Neurosity Crown, ECG Polar H10, PPG Polar Verity Sense, caméra thermique FLIR Lepton et suivi oculaire Gazepoint.

Les modules capteurs écrivent dans une file de sortie puis dans un DataBus central. Un seul diffuseur WebSocket relaie les mises à jour vers le tableau de bord Socket.IO. En parallèle, les flux natifs Lab Streaming Layer partagent une horloge commune et sont enregistrés par LSLRecorder. SQLite conserve les métadonnées des séances, des participants et des scénarios.

Le traitement hors ligne contrôle et nettoie les enregistrements, crée des chronologies à 1 Hz ou 10 Hz, extrait des caractéristiques par fenêtres de 30 ou 60 secondes et calcule des mesures de variabilité cardiaque sur 300 secondes. Les familles de modèles étudiées comprennent Ridge, Lasso, ElasticNet, SVR, forêt aléatoire, LightGBM, XGBoost, CatBoost, 1D-CNN, TCN et GRU. Optuna sert au réglage des paramètres et SHAP à l'interprétation.

Les cibles de recherche comprennent la charge de travail, la concentration, la fatigue, la vigilance, l'engagement, certains indicateurs de stress ou de calme et des mesures comme SDNN et MeanNN. La couverture et la validation varient selon la cible. Présente les sorties comme des estimations de recherche; ne prétends pas que tous les modèles sont déployés, validés ou adaptés à un usage clinique.

## Autres projets

- J'aime évaluer : application Flutter gratuite réalisée avec l'équipe de recherche eVADID de l'UQAC, dirigée par la professeure Nicole Monney, pour aider le personnel enseignant à maîtriser l'évaluation en classe. Vidéos, balados et infographies sur six thèmes du cycle de l'évaluation, progression conservée sur l'appareil, aucun compte à créer. Publiée en septembre 2026. App Store : https://apps.apple.com/us/app/jaime-%C3%A9valuer/id6824184352 et Google Play : https://play.google.com/store/apps/details?id=ca.jaimeevaluer.evadid. Florent a intégré et corrigé l'API mobile, mené les tests, assuré les publications sur les deux magasins et rédigé la documentation.
- Espace Vases d'Honneur : plateforme des membres de l'église Vases d'Honneur Chicoutimi. Connexion par téléphone avec code à usage unique par SMS, rôles et permissions avec périmètre (église, tribu, GEM, membre), espace personnel du fidèle, fiche de santé spirituelle mensuelle, résolutions du mois, devoir de la semaine, feuilles de présence, exercices, rendez-vous avec le pasteur, calendrier, rapports mensuels avec export PDF, journal d'audit, notifications et push web. API Laravel 13 avec PHP 8.3 et interface React 19 en TypeScript, installable comme application web progressive.
- Vases d'Honneur Chicoutimi : site vitrine construit avec Astro, avec la diffusion des cultes par YouTube, une galerie photo, le répertoire des tribus et les dons par PayPal. Adresse : https://vasesdhonneurchicoutimi.org.
- Pasteur Abraham Andebi : site personnel avec prédications, horaires, livre, balados et dons en ligne. Site statique avec optimisation des images par Sharp. Adresse : https://abrahamandebi.com/. Code : https://github.com/gotflo/pasteur_abraham.
- Neurosity Crown Monitor : application Flask et Socket.IO de suivi EEG en temps réel pour le casque Neurosity Crown. Calme, concentration, cinq bandes de fréquence, huit voies brutes à 256 Hz, qualité des électrodes, enregistrement des séances en CSV et lecteur d'analyse avec relecture. Bilingue. Code : https://github.com/gotflo/neurosity_monitor.
- Tech Event : application Flutter qui répertorie les événements technologiques de l'année, avec Firebase. Code : https://github.com/gotflo/tech_event. APK : https://github.com/gotflo/tech_event/releases/download/tech_event/tech_event.apk.
- eHome : application mobile de vente et de location immobilière.
- PayTicket : refonte UI/UX d'une application de réservation de billets d'événements, chez IT-INNOVATION. Disponible sur Google Play.
- Hupe : application de réservation de billets d'autobus et de location de véhicules. Disponible sur Google Play.
- Bel Ice : boutique en ligne de produits glacés, https://belice.netlify.app/.
- FastSOS : application mobile pour joindre rapidement les services d'urgence.

## Le portfolio lui-même

Chaque projet du portfolio a une fiche détaillée : la personne clique sur la carte du projet ou sur le bouton « Voir le détail » pour l'ouvrir. La fiche donne la présentation, la période, le rôle de Florent, les liens, les points importants et les technologies. Trois projets ont une démonstration interactive dans leur fiche : C-PILOT, le moniteur Neurosity Crown et l'Espace Vases d'Honneur. Les données de ces démonstrations sont simulées. Le site est bilingue : le bouton FR ou EN en haut à droite change la langue, et le bouton voisin change le thème clair ou sombre.

## Références

- Professeur Hamdi Ben Abdessalem, directeur de recherche C-PILOT, UQAC.
- Professeur Claude Frasson, codirecteur de recherche C-PILOT, Université de Montréal.
- Professeure Nicole Monney, projet de recherche eVADID, UQAC.

## Consignes de réponse

- Réponds en deux à quatre phrases, sauf si la personne demande les étapes ou l'architecture détaillée.
- Réponds à propos du parcours, des projets et des services de Florent, et sur la façon de parcourir le portfolio. Pour une autre question, explique brièvement que tu peux aider sur le portfolio et ses projets.
- Oriente les personnes intéressées vers le formulaire de contact, le courriel ou WhatsApp.
- Reste factuel. Si le CV ou ces notes ne donnent pas l'information, dis-le clairement et ne la devine pas.
- N'affirme pas que Florent est CEO. Si la question porte sur le SEO du portfolio, comprends SEO au sens de référencement naturel.
- Évite les slogans, les grands mots, les emojis et les caractères décoratifs. Utilise une ponctuation simple et un ton humain.`;

/**
 * ChatBot Class
 */
class GotfloChatBot {
  constructor() {
    this.conversationHistory = [];
    this.isOpen = false;
    this.isTyping = false;

    this.elements = {
      container: null,
      bubble: null,
      panel: null,
      messages: null,
      input: null,
      sendBtn: null,
      closeBtn: null,
      suggestions: null,
      typingIndicator: null,
      badge: null
    };

    this.language = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';
    this.suggestions = this.getSuggestions();

    this.init();
    window.addEventListener('portfolio:languagechange', event => {
      this.updateLanguage(event.detail?.language || document.documentElement.lang);
    });
  }

  uiCopy() {
    return this.language === 'fr'
      ? { open: 'Ouvrir l’assistant de Florent', title: 'Assistant de Florent', online: 'En ligne', clear: 'Effacer la conversation', close: 'Fermer', placeholder: 'Posez une question sur Florent...', send: 'Envoyer', powered: 'Assistant du portfolio' }
      : { open: "Open Florent's assistant", title: "Florent's assistant", online: 'Online', clear: 'Clear conversation', close: 'Close', placeholder: 'Ask a question about Florent...', send: 'Send message', powered: 'Portfolio assistant' };
  }

  getSuggestions() {
    return this.language === 'fr'
      ? [
          { text: 'Qui est Florent ?', icon: 'bx-user' },
          { text: 'Quelles sont ses compétences ?', icon: 'bx-code-alt' },
          { text: 'Quels sont ses projets ?', icon: 'bx-folder-open' },
          { text: 'Parlez-moi de C-PILOT', icon: 'bx-brain' },
          { text: 'Est-il disponible ?', icon: 'bx-calendar-check' },
          { text: 'Comment le contacter ?', icon: 'bx-envelope' }
        ]
      : [
          { text: 'Who is Florent?', icon: 'bx-user' },
          { text: 'What are his skills?', icon: 'bx-code-alt' },
          { text: 'What projects has he worked on?', icon: 'bx-folder-open' },
          { text: 'Tell me about C-PILOT', icon: 'bx-brain' },
          { text: 'Is he available?', icon: 'bx-calendar-check' },
          { text: 'How can I contact him?', icon: 'bx-envelope' }
        ];
  }

  updateLanguage(language) {
    this.language = String(language).startsWith('fr') ? 'fr' : 'en';
    const copy = this.uiCopy();
    this.elements.bubble.setAttribute('aria-label', copy.open);
    this.elements.panel.querySelector('.chatbot-header-text h4').textContent = copy.title;
    this.elements.panel.querySelector('.chatbot-status').textContent = copy.online;
    this.elements.clearBtn.setAttribute('aria-label', copy.clear);
    this.elements.clearBtn.setAttribute('title', copy.clear);
    this.elements.closeBtn.setAttribute('aria-label', copy.close);
    this.elements.input.setAttribute('placeholder', copy.placeholder);
    this.elements.sendBtn.setAttribute('aria-label', copy.send);
    this.elements.panel.querySelector('.chatbot-powered').textContent = copy.powered;
    this.suggestions = this.getSuggestions();
    this.renderSuggestions();

    if (!this.elements.messages.querySelector('.chatbot-msg-user')) {
      this.elements.messages.innerHTML = '';
      this.showWelcomeMessage();
    }
  }

  /**
   * Build and inject the chatbot DOM
   */
  init() {
    this.createDOM();
    this.cacheElements();
    this.bindEvents();
    this.showWelcomeMessage();
  }

  createDOM() {
    const copy = this.uiCopy();
    const chatHTML = `
    <div class="chatbot-container" id="chatbotContainer">
      <!-- Floating Bubble -->
      <button class="chatbot-bubble" id="chatbotBubble" aria-label="${copy.open}">
        <i class="bx bx-bot chatbot-bubble-icon"></i>
        <i class="bx bx-x chatbot-bubble-close"></i>
        <span class="chatbot-badge" id="chatbotBadge">1</span>
        <div class="chatbot-bubble-pulse"></div>
      </button>

      <!-- Chat Panel -->
      <div class="chatbot-panel" id="chatbotPanel">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="bx bx-bot"></i>
              <span class="chatbot-status-dot"></span>
            </div>
            <div class="chatbot-header-text">
              <h4>${copy.title}</h4>
              <span class="chatbot-status">${copy.online}</span>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button class="chatbot-action-btn" id="chatbotClear" aria-label="${copy.clear}" title="${copy.clear}">
              <i class="bx bx-trash"></i>
            </button>
            <button class="chatbot-action-btn" id="chatbotClose" aria-label="${copy.close}">
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="chatbot-messages" id="chatbotMessages">
          <!-- Messages will be injected here -->
        </div>

        <!-- Typing Indicator -->
        <div class="chatbot-typing" id="chatbotTyping">
          <div class="chatbot-typing-avatar">
            <i class="bx bx-bot"></i>
          </div>
          <div class="chatbot-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <!-- Suggestion Chips -->
        <div class="chatbot-suggestions" id="chatbotSuggestions"></div>

        <!-- Input Area -->
        <div class="chatbot-input-area">
          <div class="chatbot-input-wrap">
            <textarea
              id="chatbotInput"
              class="chatbot-input"
              placeholder="${copy.placeholder}"
              rows="1"
              maxlength="500"
            ></textarea>
            <button class="chatbot-send" id="chatbotSend" aria-label="${copy.send}" disabled>
              <i class="bx bx-send"></i>
            </button>
          </div>
          <span class="chatbot-powered">${copy.powered}</span>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  cacheElements() {
    this.elements.container = document.getElementById('chatbotContainer');
    this.elements.bubble = document.getElementById('chatbotBubble');
    this.elements.panel = document.getElementById('chatbotPanel');
    this.elements.messages = document.getElementById('chatbotMessages');
    this.elements.input = document.getElementById('chatbotInput');
    this.elements.sendBtn = document.getElementById('chatbotSend');
    this.elements.closeBtn = document.getElementById('chatbotClose');
    this.elements.clearBtn = document.getElementById('chatbotClear');
    this.elements.suggestions = document.getElementById('chatbotSuggestions');
    this.elements.typingIndicator = document.getElementById('chatbotTyping');
    this.elements.badge = document.getElementById('chatbotBadge');
  }

  bindEvents() {
    // Toggle chat
    this.elements.bubble.addEventListener('click', () => this.toggle());
    this.elements.closeBtn.addEventListener('click', () => this.close());

    // Send message
    this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
    this.elements.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    this.elements.input.addEventListener('input', () => {
      this.elements.input.style.height = 'auto';
      this.elements.input.style.height = Math.min(this.elements.input.scrollHeight, 100) + 'px';
      this.elements.sendBtn.disabled = !this.elements.input.value.trim();
    });

    // Clear chat
    this.elements.clearBtn.addEventListener('click', () => this.clearChat());

    // Close on outside click (mobile)
    document.addEventListener('click', (e) => {
      if (this.isOpen &&
          !this.elements.container.contains(e.target) &&
          !e.target.closest('#languageToggle')) {
        this.close();
      }
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Render suggestion chips
    this.renderSuggestions();
  }

  /**
   * Toggle panel open/close
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.elements.container.classList.add('chatbot-open');
    this.elements.badge.style.display = 'none';
    this.scrollToBottom();

    setTimeout(() => {
      this.elements.input.focus();
    }, 400);
  }

  close() {
    this.isOpen = false;
    this.elements.container.classList.remove('chatbot-open');
  }

  /**
   * Render suggestion chips
   */
  renderSuggestions() {
    this.elements.suggestions.innerHTML = this.suggestions
      .map(s => `
        <button class="chatbot-chip" data-message="${s.text}">
          <i class="bx ${s.icon}"></i>
          <span>${s.text}</span>
        </button>
      `).join('');

    this.elements.suggestions.querySelectorAll('.chatbot-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const message = chip.getAttribute('data-message');
        this.elements.input.value = message;
        this.sendMessage();
      });
    });
  }

  /**
   * Show welcome message on first load
   */
  showWelcomeMessage() {
    const welcomeMsg = this.language === 'fr'
      ? `Bonjour, je suis l’assistant de **Florent**. Je peux vous renseigner sur son parcours, ses projets et ses services.\n\nPosez votre question ou choisissez une suggestion ci-dessous.`
      : `Hello, I am **Florent's portfolio assistant**. I can answer questions about his experience, projects and services.\n\nAsk a question or choose one of the suggestions below.`;

    this.addMessage('bot', welcomeMsg);
  }

  /**
   * Send a user message and get AI response
   */
  async sendMessage() {
    const text = this.elements.input.value.trim();
    if (!text || this.isTyping) return;

    // Add user message
    this.addMessage('user', text);
    this.elements.input.value = '';
    this.elements.input.style.height = 'auto';
    this.elements.sendBtn.disabled = true;

    // Hide suggestions after first message
    this.elements.suggestions.classList.add('chatbot-suggestions-hidden');

    // Show typing indicator
    this.showTyping();

    try {
      const response = await this.callGemini(text);
      this.hideTyping();
      this.addMessage('bot', response);
    } catch (error) {
      this.hideTyping();
      console.error('Gemini API Error:', error);

      if (GEMINI_CONFIG.apiKey === 'MISSING_API_KEY') {
        this.addMessage('bot', this.language === 'fr'
          ? "L’assistant n’est pas configuré pour répondre pour le moment. Vous pouvez contacter Florent à **komlagotlieb@gmail.com**."
          : "The assistant is not configured to reply right now. You can contact Florent at **komlagotlieb@gmail.com**.");
      } else if (error.message?.includes('rate limit') || error.message?.includes('429') || error.message?.includes('quota')) {
        this.addMessage('bot', this.language === 'fr'
          ? "L’assistant reçoit beaucoup de demandes. Réessayez dans quelques secondes ou contactez Florent avec le formulaire ci-dessous."
          : "The assistant is receiving many requests. Please try again in a few seconds or contact Florent using the form below.");
      } else {
        this.addMessage('bot', this.language === 'fr'
          ? "Une erreur est survenue. Vous pouvez contacter Florent à **komlagotlieb@gmail.com** ou avec le formulaire ci-dessous."
          : "Something went wrong. You can contact Florent at **komlagotlieb@gmail.com** or use the form below.");
      }
    }
  }

  /**
   * Call Google Gemini API with retry + fallback model
   */
  async callGemini(userMessage) {
    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // Build request body
    const body = {
      contents: this.conversationHistory,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 800,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
      ]
    };

    // Try primary model, then fallback, with retries on 429
    const modelsToTry = [GEMINI_CONFIG.model, GEMINI_CONFIG.fallbackModel];

    for (const model of modelsToTry) {
      for (let attempt = 0; attempt <= GEMINI_CONFIG.maxRetries; attempt++) {
        try {
          const url = `${GEMINI_CONFIG.apiUrl}/${model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          if (response.status === 429) {
            // Wait and retry after a rate limit response
            console.warn(`Rate limited on ${model} (attempt ${attempt + 1}/${GEMINI_CONFIG.maxRetries + 1}). Retrying in ${GEMINI_CONFIG.retryDelayMs}ms...`);

            if (attempt < GEMINI_CONFIG.maxRetries) {
              await this.sleep(GEMINI_CONFIG.retryDelayMs * (attempt + 1));
              continue;
            }
            // Max retries exhausted for this model, try fallback
            break;
          }

          if (response.status === 404) {
            // Skip a model that is not available and try the fallback
            console.warn(`Model ${model} not found (404). Trying next model...`);
            break;
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
          }

          const data = await response.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!aiText) {
            throw new Error('No text in Gemini response');
          }

          // Save AI response to history
          this.conversationHistory.push({
            role: 'model',
            parts: [{ text: aiText }]
          });

          // Keep history manageable (last 20 exchanges)
          if (this.conversationHistory.length > 40) {
            this.conversationHistory = this.conversationHistory.slice(-20);
          }

          console.log(`Response received from ${model}`);
          return aiText;

        } catch (error) {
          // Retry only rate limit and unavailable-model errors
          if (!error.message?.includes('429') && !error.message?.includes('404')) {
            // Remove the user message we added since it failed
            this.conversationHistory.pop();
            throw error;
          }
        }
      }
    }

    // All models and retries exhausted
    this.conversationHistory.pop(); // Remove user message
    throw new Error('All models are rate limited. Please try again in a moment.');
  }

  /**
   * Utility: sleep for ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Add a message to the chat UI
   */
  addMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbot-msg', `chatbot-msg-${role}`);

    const avatar = role === 'bot'
      ? '<div class="chatbot-msg-avatar"><i class="bx bx-bot"></i></div>'
      : '';

    const formattedText = this.formatText(text);

    msgDiv.innerHTML = `
      ${avatar}
      <div class="chatbot-msg-content">
        <div class="chatbot-msg-bubble">${formattedText}</div>
        <span class="chatbot-msg-time">${this.getTime()}</span>
      </div>
    `;

    this.elements.messages.appendChild(msgDiv);

    // Animate in
    requestAnimationFrame(() => {
      msgDiv.classList.add('chatbot-msg-show');
    });

    this.scrollToBottom();
  }

  /**
   * Simple markdown-like formatting
   */
  formatText(text) {
    return text
      // Bold **text**
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic *text*
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
      // Inline code `text`
      .replace(/`(.+?)`/g, '<code>$1</code>')
      // Unordered lists
      .replace(/^[-•]\s+(.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      // Numbered lists
      .replace(/^\d+\.\s+(.+)/gm, '<li>$1</li>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>');
  }

  /**
   * Get current time string
   */
  getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Scroll messages to bottom
   */
  scrollToBottom() {
    setTimeout(() => {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }, 50);
  }

  /**
   * Show/hide typing indicator
   */
  showTyping() {
    this.isTyping = true;
    this.elements.typingIndicator.classList.add('chatbot-typing-show');
    this.scrollToBottom();
  }

  hideTyping() {
    this.isTyping = false;
    this.elements.typingIndicator.classList.remove('chatbot-typing-show');
  }

  /**
   * Clear conversation
   */
  clearChat() {
    this.conversationHistory = [];
    this.elements.messages.innerHTML = '';
    this.elements.suggestions.classList.remove('chatbot-suggestions-hidden');
    this.showWelcomeMessage();
  }
}

/**
 * Initialize chatbot when DOM is ready AND config is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Attendre que le .env soit chargé
  if (typeof configReady !== 'undefined') {
    await configReady;
  }
  window.gotfloChatBot = new GotfloChatBot();
});
