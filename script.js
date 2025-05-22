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
    }
  ]
};

// Game state
let currentDifficulty = 'easy';
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 3;
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