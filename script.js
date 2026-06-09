const languageSelect = document.getElementById('languageSelect');
const xpValue = document.getElementById('xpValue');
const levelValue = document.getElementById('levelValue');
const currentBadge = document.getElementById('currentBadge');
const progressFill = document.getElementById('progressFill');
const progressSubtitle = document.getElementById('progressSubtitle');
const quizWord = document.getElementById('quizWord');
const quizDirectionLabel = document.getElementById('quizDirectionLabel');
const quizSourceLang = document.getElementById('quizSourceLang');
const quizTargetLang = document.getElementById('quizTargetLang');
const swapLangs = document.getElementById('swapLangs');
const choicesContainer = document.getElementById('choicesContainer');
const quizFeedback = document.getElementById('quizFeedback');
const newQuizButton = document.getElementById('newQuiz');
const listenButton = document.getElementById('listenButton');
const quizSourceLangLabel = document.querySelector('label[for="quizSourceLang"]');
const quizTargetLangLabel = document.querySelector('label[for="quizTargetLang"]');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');

const languages = {
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'Anglais', flag: '🇬🇧' },
  es: { label: 'Espagnol', flag: '🇪🇸' },
  de: { label: 'Allemand', flag: '🇩🇪' }
};

const translations = {
  fr: {
    starter: 'Bonjour',
    prompt: 'Traduisez ce mot',
    chooseAnswer: 'Choisissez une réponse pour commencer.',
    newQuestion: 'Nouvelle question',
    listen: 'Écouter',
    askBot: 'Écris un message...',
    send: 'Envoyer',
    badge: ['Débutant', 'Apprenti', 'Intermédiaire', 'Avancé', 'Expert'],
    directionLabel: 'Direction',
    directionAuto: 'Auto (toutes directions)',
    directionUiToOther: 'Langue UI vers autre',
    directionOtherToUi: 'Autre vers langue UI',
    fromLang: 'De',
    toLang: 'Vers',
    sameLanguageError: 'Choisissez deux langues différentes',
    chatReplies: {
      greeting: 'Salut ! Je peux t’aider à pratiquer les langues.',
      practice: 'Essaie de traduire un mot ou demande une astuce de vocabulaire.',
      pronunciation: 'Appuie sur le bouton Écouter pour entendre la prononciation.',
      progress: 'Continue comme ça, tu gagnes de l’XP à chaque bonne réponse !',
      default: 'J’ai bien reçu ton message. Pose-moi une autre question de langue.'
    }
  },
  en: {
    starter: 'Hello',
    prompt: 'Translate this word',
    chooseAnswer: 'Choose an answer to begin.',
    newQuestion: 'New question',
    listen: 'Listen',
    directionLabel: 'Direction',
    directionAuto: 'Auto (all directions)',
    directionUiToOther: 'UI language → other',
    directionOtherToUi: 'Other → UI language',
    fromLang: 'From',
    toLang: 'To',
    sameLanguageError: 'Choose two different languages',
    askBot: 'Type a message...',
    send: 'Send',
    badge: ['Beginner', 'Apprentice', 'Intermediate', 'Advanced', 'Expert'],
    chatReplies: {
      greeting: 'Hi there! I can help you practice languages.',
      practice: 'Try translating a word or ask for a vocabulary tip.',
      pronunciation: 'Use the Listen button to hear the pronunciation.',
      progress: 'Keep going, you earn XP for each correct answer!',
      default: 'Got your message. Ask me another language question.'
    }
  },
  es: {
    starter: 'Hola',
    prompt: 'Traduce esta palabra',
    chooseAnswer: 'Selecciona una respuesta para comenzar.',
    newQuestion: 'Nueva pregunta',
    listen: 'Escuchar',
    directionLabel: 'Dirección',
    directionAuto: 'Auto (todas las direcciones)',
    directionUiToOther: 'Idioma UI → otro',
    directionOtherToUi: 'Otro → idioma UI',
    fromLang: 'De',
    toLang: 'A',
    sameLanguageError: 'Elige dos idiomas diferentes',
    askBot: 'Escribe un mensaje...',
    send: 'Enviar',
    badge: ['Principiante', 'Aprendiz', 'Intermedio', 'Avanzado', 'Experto'],
    chatReplies: {
      greeting: '¡Hola! Puedo ayudarte a practicar idiomas.',
      practice: 'Intenta traducir una palabra o pide un consejo de vocabulario.',
      pronunciation: 'Usa el botón Escuchar para oír la pronunciación.',
      progress: 'Sigue así, ganas XP con cada respuesta correcta.',
      default: 'Recibí tu mensaje. Hazme otra pregunta de idioma.'
    }
  },
  de: {
    starter: 'Hallo',
    prompt: 'Übersetze dieses Wort',
    chooseAnswer: 'Wähle eine Antwort, um zu beginnen.',
    newQuestion: 'Neue Frage',
    listen: 'Anhören',
    directionLabel: 'Richtung',
    directionAuto: 'Auto (alle Richtungen)',
    directionUiToOther: 'UI-Sprache → andere',
    directionOtherToUi: 'Andere → UI-Sprache',
    fromLang: 'Von',
    toLang: 'Zu',
    sameLanguageError: 'Wählen Sie zwei verschiedene Sprachen',
    askBot: 'Schreibe eine Nachricht...',
    send: 'Senden',
    badge: ['Anfänger', 'Lehrling', 'Mittelstufe', 'Fortgeschritten', 'Experte'],
    chatReplies: {
      greeting: 'Hallo! Ich kann dir beim Sprachenlernen helfen.',
      practice: 'Versuche, ein Wort zu übersetzen oder frage nach einem Vokabeltip.',
      pronunciation: 'Benutze die Anhören-Taste für die Aussprache.',
      progress: 'Mach weiter so, du verdienst XP für jede richtige Antwort!',
      default: 'Ich habe deine Nachricht erhalten. Frage mich etwas anderes zum Thema Sprache.'
    }
  }
};

const quizBank = [
  { key: 'hello', fr: 'Bonjour', en: 'Hello', es: 'Hola', de: 'Hallo' },
  { key: 'thank you', fr: 'Merci', en: 'Thank you', es: 'Gracias', de: 'Danke' },
  { key: 'goodbye', fr: 'Au revoir', en: 'Goodbye', es: 'Adiós', de: 'Tschüss' },
  { key: 'please', fr: 'S’il vous plaît', en: 'Please', es: 'Por favor', de: 'Bitte' },
  { key: 'yes', fr: 'Oui', en: 'Yes', es: 'Sí', de: 'Ja' },
  { key: 'no', fr: 'Non', en: 'No', es: 'No', de: 'Nein' },
  { key: 'water', fr: 'Eau', en: 'Water', es: 'Agua', de: 'Wasser' },
  { key: 'food', fr: 'Nourriture', en: 'Food', es: 'Comida', de: 'Essen' },
  { key: 'school', fr: 'École', en: 'School', es: 'Escuela', de: 'Schule' },
  { key: 'friend', fr: 'Ami', en: 'Friend', es: 'Amigo', de: 'Freund' }
];

let appState = {
  language: 'fr',
  xp: 0,
  level: 1,
  activeQuiz: null,
  selectedAnswer: null
};

function getBadge(level) {
  const badgeLevels = [0, 100, 250, 500, 900];
  const badges = translations[appState.language].badge;
  for (let i = badgeLevels.length - 1; i >= 0; i -= 1) {
    if (appState.xp >= badgeLevels[i]) return badges[i];
  }
  return badges[0];
}

function updateProgress() {
  appState.level = Math.min(15, Math.floor(appState.xp / 100) + 1);
  const nextLevelXP = appState.level * 100;
  const currentLevelFloor = (appState.level - 1) * 100;
  const progress = ((appState.xp - currentLevelFloor) / (nextLevelXP - currentLevelFloor)) * 100;

  xpValue.textContent = appState.xp;
  levelValue.textContent = appState.level;
  currentBadge.textContent = getBadge(appState.level);
  progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  progressSubtitle.textContent = `${appState.xp} / ${nextLevelXP} XP vers le niveau ${appState.level + 1}`;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function setTextContent(target, text) {
  if (target) target.textContent = text;
}

function getRandomLanguage(exclude) {
  const keys = Object.keys(languages).filter((code) => code !== exclude);
  return randomItem(keys);
}

function formatDirectionLabel(sourceLang, targetLang) {
  const sourceName = languages[sourceLang].label;
  const targetName = languages[targetLang].label;
  return `${translations[appState.language].prompt} (${languages[sourceLang].flag} ${sourceName} → ${languages[targetLang].flag} ${targetName})`;
}

function buildQuiz() {
  const quiz = randomItem(quizBank);
  const sourceLang = quizSourceLang.value;
  const targetLang = quizTargetLang.value;

  if (sourceLang === targetLang) {
    quizFeedback.textContent = translations[appState.language].sameLanguageError || '⚠️ Choisissez deux langues différentes';
    choicesContainer.innerHTML = '';
    return;
  }

  const correct = quiz[targetLang];
  const wrongOptions = shuffle(
    quizBank
      .filter((item) => item.key !== quiz.key)
      .map((item) => item[targetLang])
  ).slice(0, 3);
  const choices = shuffle([correct, ...wrongOptions]);

  appState.activeQuiz = {
    prompt: quiz[sourceLang],
    sourceLang,
    targetLang,
    answer: correct,
    choices
  };

  quizDirectionLabel.textContent = formatDirectionLabel(sourceLang, targetLang);
  quizWord.textContent = quiz[sourceLang];
  quizFeedback.textContent = translations[appState.language].chooseAnswer;
  choicesContainer.innerHTML = '';

  choices.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.textContent = choice;
    button.addEventListener('click', () => handleAnswer(choice, button));
    choicesContainer.appendChild(button);
  });
}

function handleAnswer(choice, button) {
  if (!appState.activeQuiz) return;
  const correct = appState.activeQuiz.answer;
  const buttons = Array.from(choicesContainer.children);
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
  });

  if (choice === correct) {
    button.classList.add('correct');
    appState.xp += 35;
    quizFeedback.textContent = getLocalizedMessage('correct');
  } else {
    button.classList.add('wrong');
    appState.xp = Math.max(0, appState.xp - 10);
    quizFeedback.textContent = getLocalizedMessage('wrong');
  }
  updateProgress();
}

function getLocalizedMessage(key) {
  const messages = {
    correct: {
      fr: 'Bravo ! C’est la bonne réponse.',
      en: 'Great! That is correct.',
      es: '¡Genial! Es la respuesta correcta.',
      de: 'Super! Das ist richtig.'
    },
    wrong: {
      fr: 'Oups, essaie encore.',
      en: 'Oops, try again.',
      es: 'Ups, inténtalo de nuevo.',
      de: 'Oops, versuche es noch einmal.'
    }
  };
  return messages[key][appState.language];
}

function speakWord() {
  const text = appState.activeQuiz ? appState.activeQuiz.prompt : translations[appState.language].starter;
  if (!('speechSynthesis' in window)) {
    quizFeedback.textContent = 'Speech synthesis non supporté.';
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getSpeakLang(appState.activeQuiz ? appState.activeQuiz.sourceLang : appState.language);
  utterance.rate = 0.9;
  utterance.pitch = 1.05;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function getSpeakLang(code) {
  switch (code) {
    case 'fr': return 'fr-FR';
    case 'en': return 'en-US';
    case 'es': return 'es-ES';
    case 'de': return 'de-DE';
    default: return 'en-US';
  }
}

function addChatMessage(text, type = 'bot') {
  const bubble = document.createElement('div');
  bubble.className = `chat-item ${type}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleChat() {
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage(message, 'user');
  chatInput.value = '';
  setTimeout(() => {
    const reply = generateChatReply(message.toLowerCase());
    addChatMessage(reply, 'bot');
  }, 320);
}

function generateChatReply(message) {
  const keys = translations[appState.language].chatReplies;
  if (message.includes('bonjour') || message.includes('hello') || message.includes('hola') || message.includes('hallo')) {
    return keys.greeting;
  }
  if (message.includes('pratique') || message.includes('practice') || message.includes('práctica') || message.includes('üben')) {
    return keys.practice;
  }
  if (message.includes('écoute') || message.includes('listen') || message.includes('escuchar') || message.includes('anhören')) {
    return keys.pronunciation;
  }
  if (message.includes('xp') || message.includes('progress') || message.includes('progreso') || message.includes('fortschritt')) {
    return keys.progress;
  }
  return keys.default;
}

function updateUIForLanguage() {
  newQuizButton.textContent = translations[appState.language].newQuestion;
  listenButton.textContent = translations[appState.language].listen;
  quizSourceLangLabel.textContent = translations[appState.language].fromLang;
  quizTargetLangLabel.textContent = translations[appState.language].toLang;
  quizFeedback.textContent = translations[appState.language].chooseAnswer;
  chatInput.placeholder = translations[appState.language].askBot;
  sendChat.textContent = translations[appState.language].send;
  document.documentElement.lang = appState.language;
  buildQuiz();
}

languageSelect.addEventListener('change', (event) => {
  appState.language = event.target.value;
  updateUIForLanguage();
});

quizSourceLang.addEventListener('change', () => buildQuiz());
quizTargetLang.addEventListener('change', () => buildQuiz());
swapLangs.addEventListener('click', () => {
  const temp = quizSourceLang.value;
  quizSourceLang.value = quizTargetLang.value;
  quizTargetLang.value = temp;
  buildQuiz();
});

newQuizButton.addEventListener('click', () => buildQuiz());
listenButton.addEventListener('click', () => speakWord());
sendChat.addEventListener('click', handleChat);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleChat();
});

updateProgress();
updateUIForLanguage();
