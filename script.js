// Quiz questions database with emojis
const quizData = {
  easy: [
    {
      question: "🔬 What is the basic unit of life?",
      options: ["Cell", "Atom", "Molecule", "Tissue"],
      correct: 0,
      emoji: "🦠"
    },
    {
      question: "🌱 What do plants need for photosynthesis?",
      options: ["Sunlight and water", "Darkness and water", "Just water", "Just sunlight"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🦁 Which group do lions belong to?",
      options: ["Mammals", "Reptiles", "Birds", "Fish"],
      correct: 0,
      emoji: "🦁"
    },
    {
      question: "🌿 Which organisms need oxygen to survive?",
      options: ["Both plants and animals", "Only animals", "Only plants", "Neither plants nor animals"],
      correct: 0,
      emoji: "🫁"
    },
    {
      question: "🌱 Where does photosynthesis occur in plants?",
      options: ["Chloroplasts", "Nucleus", "Mitochondria", "Vacuole"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🦠 What do cells need to produce energy?",
      options: ["Nutrients and oxygen", "Only water", "Only sunlight", "Only carbon dioxide"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🔬 Which part of the cell contains genetic material?",
      options: ["Nucleus", "Cell membrane", "Cytoplasm", "Vacuole"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🌱 What color light is best for photosynthesis?",
      options: ["Red light", "Green light", "Blue light", "Yellow light"],
      correct: 0,
      emoji: "🌞"
    },
    {
      question: "🦠 What protects the cell and controls what enters and exits?",
      options: ["Cell membrane", "Cell wall", "Nucleus", "Cytoplasm"],
      correct: 0,
      emoji: "🛡️"
    },
    {
      question: "🌿 What gas do plants take in during photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correct: 0,
      emoji: "💨"
    }
  ],
  medium: [
    {
      question: "🧬 Which organelle contains DNA?",
      options: ["Nucleus", "Vacuole", "Ribosome", "Golgi body"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🌿 What gas do plants release during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correct: 0,
      emoji: "🌱"
    },
    {
      question: "🦠 What type of organism is bacteria?",
      options: ["Prokaryote", "Eukaryote", "Virus", "Fungus"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🧬 Where are photosynthetic pigments located in chloroplasts?",
      options: ["Thylakoids", "Cell wall", "Matrix", "Envelope"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "⚡ What organelle is responsible for cellular respiration?",
      options: ["Mitochondria", "Chloroplast", "Ribosome", "Golgi body"],
      correct: 0,
      emoji: "🔋"
    },
    {
      question: "🔬 What is the main function of chloroplasts?",
      options: ["Photosynthesis", "Protein synthesis", "Energy storage", "Waste removal"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🧬 Which structure produces proteins in the cell?",
      options: ["Ribosomes", "Nucleus", "Mitochondria", "Vacuole"],
      correct: 0,
      emoji: "🏭"
    },
    {
      question: "🦠 What is the main difference between plant and animal cells?",
      options: ["Cell wall presence", "Nucleus presence", "DNA presence", "Membrane presence"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🌿 What happens during the light-dependent reactions of photosynthesis?",
      options: ["Water splits into H+ and O2", "Glucose is produced", "CO2 is fixed", "ATP is broken down"],
      correct: 0,
      emoji: "☀️"
    },
    {
      question: "🧬 What is the function of the cell membrane?",
      options: ["Selective transport", "Energy production", "Protein synthesis", "Waste storage"],
      correct: 0,
      emoji: "🚪"
    }
  ],
  hard: [
    {
      question: "🧬 What is the process of DNA replication?",
      options: ["Semi-conservative", "Conservative", "Dispersive", "Random"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🔬 Which phase of mitosis comes first?",
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🦠 What is the function of ATP synthase?",
      options: ["Energy production", "Protein synthesis", "Cell division", "DNA replication"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🧬 What is the role of enzymes in photosynthesis?",
      options: ["Catalyze reactions", "Store energy", "Transport minerals", "Produce oxygen"],
      correct: 0,
      emoji: "⚗️"
    },
    {
      question: "🔬 What happens during the Calvin cycle?",
      options: ["CO2 fixation", "O2 production", "Water splitting", "ATP synthesis"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "⚡ What is the electron transport chain's function?",
      options: ["ATP synthesis", "Glucose breakdown", "Protein synthesis", "DNA replication"],
      correct: 0,
      emoji: "⛓️"
    },
    {
      question: "🧬 What is the role of NADPH in photosynthesis?",
      options: ["Electron carrier", "Energy storage", "Oxygen transport", "Carbon fixation"],
      correct: 0,
      emoji: "🔋"
    },
    {
      question: "🔬 What is the function of thylakoid membranes?",
      options: ["Light absorption", "Sugar storage", "Protein synthesis", "Waste removal"],
      correct: 0,
      emoji: "📡"
    },
    {
      question: "🦠 What is the chemiosmotic theory?",
      options: ["Proton gradient drives ATP synthesis", "DNA replication method", "Cell division process", "Protein folding mechanism"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🧬 What is the role of rubisco enzyme?",
      options: ["CO2 fixation", "O2 production", "ATP synthesis", "Glucose breakdown"],
      correct: 0,
      emoji: "🌿"
    }
  ]
};

// Game state
let currentDifficulty = 'easy';
let currentQuestionIndex = 0;
let score = 0;
// Update total questions to show more questions per round
let totalQuestions = 10;
let isAnswering = false;

// DOM Elements
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const questionContainer = document.querySelector('.question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const progressPlant = document.getElementById('progress-plant');
const progressText = document.getElementById('progress-text');
const resultContainer = document.getElementById('result-container');
const celebrationContainer = document.getElementById('celebration');

// Initialize floating cells
function createFloatingCells() {
  const cells = ['🦠', '🔬', '🧬', '🌱'];
  const container = document.createElement('div');
  container.className = 'floating-cells-container';
  document.body.appendChild(container);

  for (let i = 0; i < 10; i++) {
    const cell = document.createElement('div');
    cell.className = 'floating-cell';
    cell.textContent = cells[Math.floor(Math.random() * cells.length)];
    cell.style.left = `${Math.random() * 100}vw`;
    cell.style.top = `${Math.random() * 100}vh`;
    cell.style.animationDelay = `${Math.random() * 10}s`;
    cell.style.animationDuration = `${20 + Math.random() * 10}s`;
    container.appendChild(cell);
  }
}

// Set difficulty level
function setDifficulty(level) {
  currentDifficulty = level;
  currentQuestionIndex = 0;
  score = 0;

  difficultyBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.level === level) btn.classList.add('active');
  });

  questionContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
  showQuestion();
  updateProgress();
}

// Display current question
function showQuestion() {
  const question = quizData[currentDifficulty][currentQuestionIndex];
  questionText.innerHTML = `${question.emoji} ${question.question}`;

  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

// Check answer and update progress
function checkAnswer(selectedIndex) {
  if (isAnswering) return;
  isAnswering = true;

  const button = optionsContainer.children[selectedIndex];
  const correct = quizData[currentDifficulty][currentQuestionIndex].correct === selectedIndex;

  button.style.backgroundColor = correct ? 'var(--primary-green)' : '#ff6b6b';
  button.style.color = 'white';

  if (correct) score++;

  setTimeout(() => {
    isAnswering = false;
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      showQuestion();
      updateProgress();
    } else {
      showResults();
    }
  }, 1000);
}

// Update progress indicators
// Update the progress calculation in updateProgress function
function updateProgress() {
  const plantStages = ['🌱', '🌿', '🌳'];
  const progress = Math.floor((score / totalQuestions) * 3);
  progressPlant.textContent = plantStages[Math.min(progress, 2)];
  progressText.textContent = `${currentQuestionIndex}/${totalQuestions}`;
}

// Show final results and celebration
function showResults() {
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  // Update result text
  const resultText = document.createElement('p');
  resultText.textContent = `You got ${score} out of ${totalQuestions} correct!`;
  resultText.style.fontSize = '1.5rem';
  resultText.style.marginTop = '1rem';
  resultContainer.insertBefore(resultText, resultContainer.querySelector('.badge'));

  // Create falling leaves animation
  celebrationContainer.innerHTML = '';
  const emojis = ['🍃', '🌿', '🌱', '⭐'];
  for (let i = 0; i < 20; i++) {
    const leaf = document.createElement('div');
    leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.animationDuration = `${Math.random() * 2 + 1}s`;
    leaf.style.animationDelay = `${Math.random()}s`;
    celebrationContainer.appendChild(leaf);
  }

  // Reset celebration after animation
  setTimeout(() => {
    celebrationContainer.innerHTML = '';
    // Show play again button
    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again 🔄';
    playAgainBtn.className = 'difficulty-btn';
    playAgainBtn.onclick = () => setDifficulty(currentDifficulty);
    resultContainer.appendChild(playAgainBtn);
  }, 5000);
}

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set up difficulty button listeners
  difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setDifficulty(btn.dataset.level);
      celebrationContainer.innerHTML = '';
      resultContainer.querySelectorAll('.difficulty-btn').forEach(btn => btn.remove());
    });
  });

  // Create floating cells and start the game
  createFloatingCells();
  setDifficulty('easy');
});