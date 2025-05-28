// Common quiz functionality for all subjects
function initializeQuiz(quizData, subject) {
  // Game state
  let currentDifficulty = 'easy';
  let currentQuestionIndex = 0;
  let score = 0;
  let totalQuestions = 10;
  let isAnswering = false;
  let currentQuestions = [];
  let answeredQuestions = new Set(); // Track answered questions
  let skippedQuestions = []; // Track skipped questions
  let quizResults = []; // Track quiz results for the session

  // DOM Elements with error checking
  const difficultyBtns = document.querySelectorAll('.difficulty-btn');
  const questionContainer = document.querySelector('.question-container');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const resultContainer = document.getElementById('result-container');
  const celebrationContainer = document.getElementById('celebration');
  const prevButton = document.getElementById('prevQuestion');
  const nextButton = document.getElementById('nextQuestion');
  const skipButton = document.getElementById('skipQuestion');
  const viewResultsBtn = document.getElementById('viewResults');
  const resultsContainer = document.getElementById('resultsContainer');

  // Validate critical DOM elements
  if (!questionContainer || !resultContainer || !questionText || !optionsContainer) {
    console.error('Critical DOM elements missing. Please check HTML structure.');
    return;
  }

  // Validate quiz data structure
  function validateQuizData(data, difficulty) {
    try {
      if (!data || typeof data !== 'object') {
        console.error('Quiz data is not available or invalid');
        return false;
      }

      if (!data[difficulty] || !Array.isArray(data[difficulty])) {
        console.error(`No questions found for difficulty: ${difficulty}`);
        return false;
      }

      const questions = data[difficulty];
      if (questions.length === 0) {
        console.error(`Empty question array for difficulty: ${difficulty}`);
        return false;
      }

      // Validate each question structure
      const validQuestions = questions.filter(q =>
        q &&
        typeof q.question === 'string' &&
        q.question.trim().length > 0 &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        q.options.every(opt => typeof opt === 'string' && opt.trim().length > 0) &&
        typeof q.correct === 'number' &&
        q.correct >= 0 &&
        q.correct < q.options.length
      );

      if (validQuestions.length === 0) {
        console.error(`No valid questions found for difficulty: ${difficulty}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating quiz data:', error);
      return false;
    }
  }

  // Navigation button states
  function updateNavigationButtons() {
    if (prevButton) {
      prevButton.disabled = currentQuestionIndex === 0;
    }
    if (nextButton) {
      nextButton.disabled = currentQuestionIndex === totalQuestions - 1;
    }
    if (skipButton) {
      skipButton.disabled = answeredQuestions.has(currentQuestionIndex);
    }
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
    answeredQuestions.clear();
    skippedQuestions = [];
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
      // Clean up any existing finish button
      const existingFinishBtn = document.getElementById('finishQuiz');
      if (existingFinishBtn) {
        existingFinishBtn.remove();
      }

      difficultyBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) btn.classList.add('active');
      });
      questionContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
    }
  }

  // Show current question
  function showQuestion() {
    // Remove any existing finish button when navigating between questions
    const existingFinishBtn = document.getElementById('finishQuiz');
    if (existingFinishBtn) {
      existingFinishBtn.remove();
    }

    if (currentQuestionIndex >= currentQuestions.length) {
      // If we've gone past the last question, go back to the last question
      currentQuestionIndex = totalQuestions - 1;
    }
    const question = currentQuestions[currentQuestionIndex];
    // Handle both question formats (with and without emojis)
    questionText.innerHTML = question.emoji ? `${question.emoji} ${question.question}` : question.question;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;

      // Add mobile-friendly attributes
      button.setAttribute('type', 'button');
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');

      if (answeredQuestions.has(currentQuestionIndex)) {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
        if (index === question.correct) {
          button.style.backgroundColor = 'var(--primary-green)';
          button.style.color = 'white';
        }
      } else {
        // Enhanced mobile event handling
        const handleAnswer = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!button.disabled && !isAnswering) {
            checkAnswer(index);
          }
        };

        // Add multiple event listeners for better mobile support
        button.addEventListener('click', handleAnswer, { passive: false });
        button.addEventListener('touchend', handleAnswer, { passive: false });

        // Add visual feedback for touch
        button.addEventListener('touchstart', (e) => {
          e.preventDefault();
          button.style.transform = 'scale(0.98)';
          button.style.backgroundColor = 'var(--dark-green)';
          button.style.color = 'white';
        }, { passive: false });

        button.addEventListener('touchcancel', () => {
          button.style.transform = '';
          button.style.backgroundColor = '';
          button.style.color = '';
        });

        // Reset styles when touch moves away from button
        button.addEventListener('touchleave', () => {
          button.style.transform = '';
          button.style.backgroundColor = '';
          button.style.color = '';
        });

        // Also reset on mouse leave for hybrid devices
        button.addEventListener('mouseleave', () => {
          if (!button.disabled) {
            button.style.transform = '';
            button.style.backgroundColor = '';
            button.style.color = '';
          }
        });

        // Keyboard accessibility
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAnswer(e);
          }
        });
      }
      optionsContainer.appendChild(button);
    });
    updateNavigationButtons();
  }

  // Check answer and update progress
  function checkAnswer(selectedIndex) {
    if (isAnswering) return;
    isAnswering = true;

    const button = optionsContainer.children[selectedIndex];
    const correct = currentQuestions[currentQuestionIndex].correct === selectedIndex;

    // Disable all option buttons to prevent multiple selections
    Array.from(optionsContainer.children).forEach(btn => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
    });

    button.style.backgroundColor = correct ? 'var(--primary-green)' : '#ff6b6b';
    button.style.color = 'white';

    // Reset any touch transforms
    button.style.transform = '';

    if (correct) score++;
    answeredQuestions.add(currentQuestionIndex);

    setTimeout(() => {
      isAnswering = false;
      updateProgress();
      updateNavigationButtons();

      // Check if all questions have been answered
      if (answeredQuestions.size === totalQuestions) {
        showFinishButton();
      }
    }, 1000);
  }

  // Update progress indicators
  function updateProgress() {
    const progress = (answeredQuestions.size / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${answeredQuestions.size}/${totalQuestions}`;
  }

  // Show finish button when all questions are answered
  function showFinishButton() {
    const existingFinishBtn = document.getElementById('finishQuiz');
    if (existingFinishBtn) {
      existingFinishBtn.remove();
    }

    const finishButton = document.createElement('button');
    finishButton.id = 'finishQuiz';
    finishButton.className = 'nav-btn finish-btn';
    finishButton.innerHTML = '🏁 Finish Quiz & View Results';
    finishButton.style.background = 'linear-gradient(135deg, var(--primary-green), var(--dark-green))';
    finishButton.style.color = 'white';
    finishButton.style.fontWeight = 'bold';
    finishButton.style.fontSize = '1.1rem';
    finishButton.style.padding = '1rem 2rem';
    finishButton.style.margin = '1rem auto';
    finishButton.style.display = 'block';
    finishButton.style.width = 'fit-content';
    finishButton.style.minWidth = '250px';

    finishButton.addEventListener('click', () => {
      showResults();
    });

    // Add the button after the navigation buttons
    const navigationButtons = document.querySelector('.navigation-buttons');
    if (navigationButtons) {
      navigationButtons.parentNode.insertBefore(finishButton, navigationButtons.nextSibling);
    } else {
      // Fallback: add to question container
      questionContainer.appendChild(finishButton);
    }
  }

  // Save result to localStorage with error handling
  function saveLocalResult(resultData) {
    try {
      if (!resultData || typeof resultData !== 'object') {
        console.error('Invalid result data provided to saveLocalResult');
        return false;
      }

      const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
      results.push({
        ...resultData,
        id: Date.now() + Math.random(), // Add unique ID
        timestamp: resultData.timestamp || new Date().toISOString()
      });

      localStorage.setItem('quizResults', JSON.stringify(results));
      console.log('Result saved successfully to localStorage');
      return true;
    } catch (error) {
      console.error('Error saving result to localStorage:', error);
      return false;
    }
  }

  // Get local results
  function getLocalResults() {
    try {
      const localResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      return localResults.filter(result => result.subject === subject);
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return [];
    }
  }

  // Display results in modal (DISABLED)
  function displayResults(results = []) {
    // Modal functionality has been disabled
    console.log('Results modal is disabled');
    return;

    // The following code is commented out to disable the modal
    /*
    const resultsContainer = document.getElementById('resultsContainer');
    const modal = document.getElementById('resultsModal');

    if (!resultsContainer || !modal) {
      console.error('Required elements not found');
      return;
    }

    // Get local results if no server results provided
    const allResults = results.length > 0 ? results : getLocalResults();

    // Group results by difficulty
    const groupedResults = {
      easy: allResults.filter(r => r.difficulty === 'easy'),
      medium: allResults.filter(r => r.difficulty === 'medium'),
      hard: allResults.filter(r => r.difficulty === 'hard')
    };
    */

    // Calculate statistics
    const calculateStats = (results) => {
      if (results.length === 0) return null;
      const scores = results.map(r => (r.score / r.total) * 100);
      return {
        average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        highest: Math.round(Math.max(...scores)),
        total: results.length
      };
    };

    let resultsHTML = '<div class="results-overview">';

    // Add overall statistics
    const totalAttempts = allResults.length;
    if (totalAttempts > 0) {
      const overallStats = calculateStats(allResults);
      resultsHTML += `
        <div class="stats-summary">
          <h3>Overall Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Total Attempts</span>
              <span class="stat-value">${totalAttempts}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Average Score</span>
              <span class="stat-value">${overallStats.average}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Highest Score</span>
              <span class="stat-value">${overallStats.highest}%</span>
            </div>
          </div>
        </div>
      `;
    }

    // Create sections for each difficulty level
    Object.entries(groupedResults).forEach(([difficulty, difficultyResults]) => {
      if (difficultyResults.length > 0) {
        const stats = calculateStats(difficultyResults);
        resultsHTML += `
          <div class="difficulty-section">
            <h3>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Results</h3>
            <div class="difficulty-stats">
              <span>Average: ${stats.average}% | </span>
              <span>Best: ${stats.highest}% | </span>
              <span>Attempts: ${stats.total}</span>
            </div>
            <div class="results-list">
              ${difficultyResults
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(result => {
              const score = Math.round((result.score / result.total) * 100);
              const date = new Date(result.timestamp);
              return `
                    <div class="result-item ${score === 100 ? 'perfect-score' : ''}">
                      <div class="result-score">Score: ${result.score}/${result.total}</div>
                      <div class="result-percentage">${score}%</div>
                      <div class="result-date">${date.toLocaleDateString()}</div>
                      <div class="result-time">${date.toLocaleTimeString()}</div>
                    </div>
                  `;
            })
            .join('')}
            </div>
          </div>
        `;
      }
    });

    resultsHTML += '</div>';

    // Display results or no results message
    resultsContainer.innerHTML = allResults.length > 0
      ? resultsHTML
      : '<p class="no-results">No quiz results available yet. Complete a quiz to see your results!</p>';

    // Show the modal with animation
    modal.style.display = 'block';
    modal.offsetHeight; // Force a reflow
    modal.classList.add('visible');
  }

  // Send result to backend
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
        console.log('Result successfully sent to server:', result);
        // Update local storage with server response if needed
        return result;
      }
    } catch (error) {
      console.error('Error sending result to server:', error);
      // Server is unavailable, but we already saved locally
      return null;
    }
  }

  // Show final results
  function showResults() {
    // Hide question container and show result container
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const resultData = {
      difficulty: currentDifficulty,
      score: score,
      total: totalQuestions,
      timestamp: new Date().toISOString()
    };

    // Clear any existing result summaries to prevent duplicates
    const existingSummaries = resultContainer.querySelectorAll('.result-summary, .quiz-summary');
    existingSummaries.forEach(summary => summary.remove());

    // Create and show the immediate result summary
    const percentage = Math.round((score / totalQuestions) * 100);
    const resultSummary = document.createElement('div');
    resultSummary.className = 'result-summary';
    resultSummary.innerHTML = `
      <div class="result-details">
        <h3>Quiz Complete! 🎉</h3>
        <div class="score-display">
          <div class="big-score">${score}/${totalQuestions}</div>
          <div class="percentage">${percentage}%</div>
        </div>
        <div class="result-info">
          <p><strong>Subject:</strong> ${subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
          <p><strong>Difficulty:</strong> ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
        </div>
        <div class="score-message">
          <p>${getScoreMessage(percentage)}</p>
        </div>
      </div>
      <div class="result-actions">
        <button class="play-again-btn" onclick="setDifficulty('${currentDifficulty}')">🔄 Play Again</button>
      </div>
    `;

    // Add the summary before the badge
    const badge = resultContainer.querySelector('.badge');
    if (badge) {
      resultContainer.insertBefore(resultSummary, badge);
    } else {
      resultContainer.appendChild(resultSummary);
    }

    // View history button removed - modal functionality disabled

    // Start celebration animation
    celebrateSuccess();

    // Save result and handle backend communication
    saveAndDisplayResult(resultData);
  }

  // Save result and handle display
  function saveAndDisplayResult(resultData) {
    // Always save locally first
    const saved = saveLocalResult({
      ...resultData,
      subject: subject
    });

    if (saved) {
      console.log('Result saved locally:', resultData);
    }

    // Try to send to backend (if available)
    sendResultToBackend(resultData);
  }

  // Helper function to get a message based on score percentage
  function getScoreMessage(percentage) {
    if (percentage === 100) return "Perfect Score! 🌟";
    if (percentage >= 90) return "Excellent! 🎯";
    if (percentage >= 80) return "Great Job! 👏";
    if (percentage >= 70) return "Good Work! 👍";
    if (percentage >= 60) return "Keep Practicing! 💪";
    return "Try Again! 🔄";
  }

  // Celebration animation
  function celebrateSuccess() {
    if (!celebrationContainer) {
      console.error('Celebration container not found');
      return;
    }

    celebrationContainer.innerHTML = '';
    celebrationContainer.style.display = 'block';
    celebrationContainer.style.pointerEvents = 'none';

    const emojis = getSubjectEmojis(subject);

    for (let i = 0; i < 30; i++) {
      const element = document.createElement('div');
      element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      element.style.position = 'absolute';
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = '-50px';
      element.style.fontSize = '2rem';
      element.style.zIndex = '1000';
      element.style.pointerEvents = 'none';
      element.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
      element.style.animationDelay = `${Math.random() * 2}s`;
      celebrationContainer.appendChild(element);
    }

    // Clear celebration after animation completes
    setTimeout(() => {
      if (celebrationContainer) {
        celebrationContainer.innerHTML = '';
        celebrationContainer.style.display = 'none';
      }
    }, 5000);
  }

  // Get subject-specific celebration emojis
  function getSubjectEmojis(subject) {
    const emojiMap = {
      mathematics: ['🔢', '📐', '➗', '➕', '✖️', '📊'],
      biology: ['🧬', '🦠', '🌿', '🔬', '🫁', '🧫'],
      chemistry: ['⚗️', '🧪', '🔬', '💡', '🌡️', '💨'],
      physics: ['⚡', '🔋', '🌍', '🚀', '💫', '🌌'],
      english: ['📝', '📚', '✍️', '📖', '🔤', '📜'],
      computer: ['💻', '🖥️', '⌨️', '🖱️', '📱', '🤖'],
      history: ['📜', '🏛️', '⚔️', '👑', '🏺', '🗿'],
      religion: ['✝️', '📖', '🕊️', '⛪', '🙏', '📿'],
      furtherMaths: ['📊', '📈', '🔢', '➗', '📐', '🎯']
    };
    return emojiMap[subject] || ['⭐', '🎉', '🎊', '🏆'];
  }

  // Initialize quiz interface
  function initializeInterface() {
    // Initialize navigation
    initializeNavigation();

    // Bind difficulty buttons
    difficultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        setDifficulty(level);
      });
    });

    // Initial setup
    setDifficulty('easy');

    // Handle view results button (DISABLED)
    if (viewResultsBtn) {
      viewResultsBtn.addEventListener('click', () => {
        console.log('Results modal is disabled');
        // displayResults(); // Commented out to disable modal
      });
    }

    // Handle modal close button and outside click
    function closeModal() {
      const modal = document.getElementById('resultsModal');
      if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    }

    // Handle modal close button
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('resultsModal');
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Initialize navigation buttons
  function initializeNavigation() {
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          showQuestion();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < totalQuestions - 1) {
          currentQuestionIndex++;
          showQuestion();
        }
      });
    }

    if (skipButton) {
      skipButton.addEventListener('click', () => {
        if (!answeredQuestions.has(currentQuestionIndex)) {
          skippedQuestions.push(currentQuestionIndex);
          updateProgress();
          updateNavigationButtons();

          // Show finish button if all questions have been answered or skipped
          if (answeredQuestions.size + skippedQuestions.length === totalQuestions) {
            showFinishButton();
          }
        }
      });
    }
  }

  // Make displayResults globally accessible for button onclick handlers
  window.displayResults = displayResults;
  window.setDifficulty = setDifficulty;

  // Start initialization
  initializeInterface();
}
