// Common quiz functionality for all subjects
function initializeQuiz(quizData, subject) {
  // Game state
  let currentDifficulty = 'easy';
  let currentQuestionIndex = 0;
  let score = 0;
  let totalQuestions = 10;
  let isAnswering = false;
  let currentQuestions = [];

  // DOM Elements
  const difficultyBtns = document.querySelectorAll('.difficulty-btn');
  const questionContainer = document.querySelector('.question-container');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const resultContainer = document.getElementById('result-container');
  const celebrationContainer = document.getElementById('celebration');

  // Validate quiz data
  function validateQuizData(data, difficulty) {
    if (!data || !data[difficulty] || !Array.isArray(data[difficulty])) {
      console.error(`Invalid quiz data for ${difficulty} difficulty`);
      return false;
    }
    if (data[difficulty].length < totalQuestions) {
      console.error(`Not enough questions for ${difficulty} difficulty`);
      return false;
    }
    return true;
  }

  // Initialize game with validated data
  function initGame(difficulty) {
    if (!validateQuizData(quizData, difficulty)) {
      alert(`Sorry, ${difficulty} level questions are not available yet.`);
      return false;
    }
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    score = 0;
    currentQuestions = [...quizData[difficulty]];
    shuffleArray(currentQuestions);
    currentQuestions = currentQuestions.slice(0, totalQuestions);
    currentQuestions.forEach(question => {
      if (!question.options || !Array.isArray(question.options) || question.correct === undefined) {
        console.error('Invalid question format:', question);
        return;
      }
      const correctAnswer = question.options[question.correct];
      shuffleArray(question.options);
      question.correct = question.options.indexOf(correctAnswer);
    });
    showQuestion();
    updateProgress();
    return true;
  }

  // Shuffle function using Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // Set difficulty level
  function setDifficulty(level) {
    if (initGame(level)) {
      difficultyBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) btn.classList.add('active');
      });
      questionContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
    }
  }

  // Initialize quiz interface
  function initializeInterface() {
    // Bind difficulty buttons
    difficultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        setDifficulty(level);
      });
    });

    // Initial setup
    setDifficulty('easy');

    // Handle view results button
    const viewResultsBtn = document.getElementById('viewResults');
    if (viewResultsBtn) {
      viewResultsBtn.addEventListener('click', () => {
        const modal = document.getElementById('resultsModal');
        if (modal) modal.style.display = 'block';
      });
    }

    // Handle modal close button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        const modal = document.getElementById('resultsModal');
        if (modal) modal.style.display = 'none';
      });
    }
  }

  // Start initialization
  initializeInterface();

  // Show current question
  function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
      showResults();
      return;
    }
    const question = currentQuestions[currentQuestionIndex];
    // Handle both question formats (with and without emojis)
    questionText.innerHTML = question.emoji ? `${question.emoji} ${question.question}` : question.question;

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
    const correct = currentQuestions[currentQuestionIndex].correct === selectedIndex;

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
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex}/${totalQuestions}`;
  }

  // Send result to backend API
  async function sendResultToBackend(data) {
    try {
      const response = await fetch('http://localhost:3000/api/quiz-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          subject: subject
        })
      });
      const result = await response.json();
      if (result.success) {
        viewResultsBtn.click();
      }
    } catch (error) {
      console.error('Error sending result:', error);
    }
  }

  // Show final results
  function showResults() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const completedKey = `completed_${subject}_${currentDifficulty}`;
    if (score === totalQuestions && !localStorage.getItem(completedKey)) {
      localStorage.setItem(completedKey, 'true');
    }

    sendResultToBackend({
      difficulty: currentDifficulty,
      score: score,
      total: totalQuestions,
      timestamp: new Date().toISOString()
    });

    celebrateSuccess();
  }

  // Celebration animation
  function celebrateSuccess() {
    celebrationContainer.innerHTML = '';
    const emojis = getSubjectEmojis(subject);

    for (let i = 0; i < 20; i++) {
      const element = document.createElement('div');
      element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      element.style.left = `${Math.random() * 100}%`;
      element.style.animationDuration = `${Math.random() * 2 + 1}s`;
      element.style.animationDelay = `${Math.random()}s`;
      celebrationContainer.appendChild(element);
    }

    setTimeout(() => {
      celebrationContainer.innerHTML = '';
      const playAgainBtn = document.createElement('button');
      playAgainBtn.textContent = 'Play Again 🔄';
      playAgainBtn.className = 'difficulty-btn';
      playAgainBtn.onclick = () => setDifficulty(currentDifficulty);
      resultContainer.appendChild(playAgainBtn);
    }, 5000);
  }

  // Get subject-specific celebration emojis
  function getSubjectEmojis(subject) {
    const emojiMap = {
      mathematics: ['🔢', '📐', '➗', '➕', '✖️', '📊'],
      biology: ['🧬', '🦠', '🌿', '🔬', '🫁', '🧫'],
      chemistry: ['⚗️', '🧪', '🔬', '💡', '🌡️', '💨'],
      physics: ['⚡', '🔋', '🌍', '🚀', '💫', '🌌'],
      english: ['📝', '📚', '✍️', '📖', '🔤', '📜']
    };
    return emojiMap[subject] || ['⭐', '🎉', '🎊', '🏆'];
  }

  // Set up initial state
  setDifficulty('easy');

  // Export functions for external use
  return {
    setDifficulty,
    initGame
  };
}

// Handle modal functionality
// ... (reuse the modal code from the original script.js)
