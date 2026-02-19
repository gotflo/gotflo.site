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
  apiKey: 'AIzaSyCNLDA_6uGKsKdv16PQ-jkI-kO8BfKAoeQ',
  model: 'gemini-3-flash-preview',      // Primary model (latest Gemini 3 Flash)
  fallbackModel: 'gemini-2.5-flash',    // Fallback: stable Gemini 2.5 Flash
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  maxRetries: 2,                        // Retry on rate limit (429)
  retryDelayMs: 3000                    // Wait 3s between retries
};

/**
 * System prompt — Florent's complete profile.
 * The AI uses this to answer visitors accurately.
 */
const SYSTEM_PROMPT = `Tu es l'assistant IA personnel de K. Florent Gotliebe AKPA, intégré directement dans son portfolio professionnel. Tu es chaleureux, professionnel, précis et tu parles naturellement. Tu réponds dans la langue du visiteur (français ou anglais).

## QUI EST FLORENT

**Identité :**
- Nom complet : K. Florent Gotliebe AKPA
- Titre : AI Researcher & Computer Vision Developer
- Localisation : Chicoutimi, Québec, Canada
- Email : komlagotlieb@gmail.com
- Téléphone : +1 (418) 718-1876
- GitHub : github.com/gotflo
- LinkedIn : linkedin.com/in/gotflo
- Twitter : @FlorentGotliebe
- Disponibilité freelance : Oui, disponible

## FORMATION

1. **UQAC** (Université du Québec à Chicoutimi) — Maîtrise en Informatique (2024-2026)
   - Spécialisation : Intelligence Artificielle & Vision par Ordinateur
   - Projet de recherche principal : "Évaluation en temps réel de l'état cognitif des pilotes à l'aide de capteurs non intrusifs"
   - Ce projet connecte plusieurs capteurs, collecte des données brutes, et entraîne puis déploie des modèles IA personnalisés

2. **DEFITECH** — Informatique / Génie Logiciel (2019-2022)
   - Formation complète en développement logiciel

3. **CISCO CCNA** — Certification Réseau (2019-2021)
   - CCNAv7 : Switching, Routing, and Wireless Essentials
   - Programme en ligne

## COMPÉTENCES TECHNIQUES

| Compétence | Niveau |
|-----------|--------|
| Figma (UI/UX Design) | 93% — Expert |
| HTML/CSS | 90% — Expert |
| Flutter | 87% — Avancé |
| Python (ML/AI) | 85% — Avancé |
| Firebase | 85% — Avancé |
| Computer Vision | 82% — Avancé |
| Machine Learning | 80% — Avancé |
| JavaScript | 75% — Intermédiaire-Avancé |
| VueJS | 73% — Intermédiaire |
| SpringBoot | 70% — Intermédiaire |

**Connaissances supplémentaires :**
- Frameworks ML : TensorFlow, PyTorch
- Vision : OpenCV
- Base de données : MySQL, NoSQL
- Versioning : GitHub & Git
- Design : UI/UX Design avancé
- Réseau : CCNA
- Méthodologie : Agile
- Rédaction : Recherche & Écriture technique

## PROJETS PORTFOLIO

1. **Tech Event** (Mobile App — Flutter)
   - Application mobile pour lister les événements technologiques de l'année
   - Interaction directe avec une base de données Firebase
   - Téléchargeable sur GitHub

2. **eHome** (Mobile App — Flutter)
   - Application de vente et location immobilière

3. **PayTicket** (UI/UX Design)
   - Redesign de l'application de réservation de billets d'événements
   - Disponible sur Google Play Store

4. **Hupe** (Mobile App — Flutter)
   - Application de réservation de billets de bus et location de véhicules
   - Disponible sur Google Play Store

5. **Bel Ice** (Web App — E-commerce)
   - Site e-commerce pour des produits de glace
   - En ligne : belice.netlify.app

6. **FastSOS** (Mobile App — Flutter)
   - Application de contact rapide avec les services d'urgence

## SERVICES PROPOSÉS

1. **Recherche IA & Développement en Vision par Ordinateur**
   - Solutions IA pour interpréter les états émotionnels et cognitifs humains
   - Fusion de la recherche IA avancée avec le développement d'applications pratiques

2. **Développement Mobile** (Flutter)
   - Applications cross-platform performantes
   - Aide les entreprises à gagner en visibilité

3. **Développement Web**
   - Sites vitrines, e-commerce, systèmes de gestion d'événements

4. **UI/UX Design**
   - Interfaces utilisateur esthétiques pour mobile et web
   - Focus sur l'expérience utilisateur

## RÈGLES DE COMPORTEMENT

- Réponds toujours de manière concise mais complète (2-4 phrases par point)
- Si on te pose une question hors du contexte de Florent, redirige poliment vers le portfolio
- Tu peux recommander de contacter Florent via le formulaire de contact, par email ou WhatsApp
- Mets en valeur les points forts de Florent naturellement
- Tu peux utiliser des emojis avec modération pour être chaleureux
- Si tu ne connais pas une information spécifique sur Florent, dis-le honnêtement
- Tu ne donnes JAMAIS d'informations fausses ou inventées
- Formate tes réponses avec du texte simple, des listes quand c'est pertinent
- Sois enthousiaste mais authentique quand tu parles des projets et compétences de Florent`;

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

    this.suggestions = [
      { text: "Qui est Florent ?", icon: "bx-user" },
      { text: "Quelles sont ses comp\u00e9tences ?", icon: "bx-code-alt" },
      { text: "Montre-moi ses projets", icon: "bx-folder-open" },
      { text: "Est-il disponible ?", icon: "bx-calendar-check" },
      { text: "Comment le contacter ?", icon: "bx-envelope" },
      { text: "What is his research about?", icon: "bx-brain" }
    ];

    this.init();
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
    const chatHTML = `
    <div class="chatbot-container" id="chatbotContainer">
      <!-- Floating Bubble -->
      <button class="chatbot-bubble" id="chatbotBubble" aria-label="Open AI Assistant">
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
              <h4>Gotflo AI</h4>
              <span class="chatbot-status">Online</span>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button class="chatbot-action-btn" id="chatbotClear" aria-label="Clear chat" title="Clear conversation">
              <i class="bx bx-trash"></i>
            </button>
            <button class="chatbot-action-btn" id="chatbotClose" aria-label="Close chat">
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
              placeholder="Ask me anything about Florent..."
              rows="1"
              maxlength="500"
            ></textarea>
            <button class="chatbot-send" id="chatbotSend" aria-label="Send message" disabled>
              <i class="bx bx-send"></i>
            </button>
          </div>
          <span class="chatbot-powered">Powered by Gemini AI</span>
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
          !this.elements.container.contains(e.target)) {
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
    const welcomeMsg = `Salut ! Je suis l'assistant IA de **Florent**. Je connais tout son parcours, ses projets et ses comp\u00e9tences.

Posez-moi vos questions ou utilisez les suggestions ci-dessous !`;

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

      if (GEMINI_CONFIG.apiKey === 'YOUR_GEMINI_API_KEY') {
        this.addMessage('bot', "L'API Gemini n'est pas encore configur\u00e9e. Veuillez ajouter votre cl\u00e9 API dans `chatbot.js`. En attendant, vous pouvez contacter Florent directement \u00e0 **komlagotlieb@gmail.com**");
      } else if (error.message?.includes('rate limit') || error.message?.includes('429') || error.message?.includes('quota')) {
        this.addMessage('bot', "Je suis un peu sollicit\u00e9 en ce moment ! Veuillez r\u00e9essayer dans quelques secondes. En attendant, n'h\u00e9sitez pas \u00e0 explorer le portfolio ou contacter Florent via le **formulaire de contact** ci-dessous.");
      } else {
        this.addMessage('bot', "D\u00e9sol\u00e9, une erreur est survenue. Vous pouvez contacter Florent directement \u00e0 **komlagotlieb@gmail.com** ou via le formulaire de contact ci-dessous.");
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
            // Rate limited — wait and retry
            console.warn(`Rate limited on ${model} (attempt ${attempt + 1}/${GEMINI_CONFIG.maxRetries + 1}). Retrying in ${GEMINI_CONFIG.retryDelayMs}ms...`);

            if (attempt < GEMINI_CONFIG.maxRetries) {
              await this.sleep(GEMINI_CONFIG.retryDelayMs * (attempt + 1));
              continue;
            }
            // Max retries exhausted for this model, try fallback
            break;
          }

          if (response.status === 404) {
            // Model not found — skip to fallback model
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
          // If it's not a rate limit or model-not-found, don't retry — throw immediately
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
 * Initialize chatbot when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  window.gotfloChatBot = new GotfloChatBot();
});
