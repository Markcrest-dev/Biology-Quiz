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

  // DOM Elements
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

  // Navigation button states
  function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === totalQuestions - 1;
    skipButton.disabled = answeredQuestions.has(currentQuestionIndex);
  }

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
      if (answeredQuestions.has(currentQuestionIndex)) {
        button.disabled = true;
        if (index === question.correct) {
          button.style.backgroundColor = 'var(--primary-green)';
          button.style.color = 'white';
        }
      } else {
        button.onclick = () => checkAnswer(index);
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

    button.style.backgroundColor = correct ? 'var(--primary-green)' : '#ff6b6b';
    button.style.color = 'white';

    if (correct) score++;
    answeredQuestions.add(currentQuestionIndex);

    setTimeout(() => {
      isAnswering = false;
      if (currentQuestionIndex < totalQuestions - 1 && !skippedQuestions.length) {
        currentQuestionIndex++;
        showQuestion();
        updateProgress();
      } else if (answeredQuestions.size === totalQuestions) {
        showResults();
      } else {
        showQuestion();
        updateProgress();
      }
    }, 1000);
  }

  // Update progress indicators
  function updateProgress() {
    const progress = (answeredQuestions.size / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${answeredQuestions.size}/${totalQuestions}`;
  }    // Store results locally if server is unavailable
  function saveLocalResult(data) {
    try {
      let localResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      const newResult = {
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      console.log('Saving result:', newResult); // Debug log
      localResults.push(newResult);
      localStorage.setItem('quizResults', JSON.stringify(localResults));
      return true;
    } catch (error) {
      console.error('Error saving to local storage:', error);
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
  }  // Display results in modal
  function displayResults(results = []) {
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
  }    // Send result to backend
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
        console.log('Results received from server:', result.results); // Debug log
        displayResults(result.results);
      }
    } catch (error) {
      console.error('Error sending result to server:', error);
      // Save locally if server is unavailable
      if (saveLocalResult({
        ...data,
        subject: subject
      })) {
        displayResults();
      }
    }
  }

  // Show final results
  function showResults() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const resultData = {
      difficulty: currentDifficulty,
      score: score,
      total: totalQuestions,
      timestamp: new Date().toISOString()
    };

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
          <p>Difficulty: ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
      </div>
      <button class="view-history-btn">View All Results History 📊</button>
    `;

    // Add the summary before the badge
    const badge = resultContainer.querySelector('.badge');
    resultContainer.insertBefore(resultSummary, badge);

    // Add click handler for view history button
    const viewHistoryBtn = resultSummary.querySelector('.view-history-btn');
    viewHistoryBtn.addEventListener('click', () => {
      displayResults();
    });

    sendResultToBackend(resultData);
    celebrateSuccess();
  }

  // Show immediate results after quiz completion
  function showQuizSummary(resultData) {
    const { score, total, difficulty } = resultData;
    const percentage = Math.round((score / total) * 100);

    // Create summary element with enhanced styling
    const summaryHTML = `
      <div class="quiz-summary">
        <div class="summary-header">
          <h2>Quiz Complete! 🎉</h2>
          <div class="final-score">
            <span class="score-number">${score}/${total}</span>
            <span class="score-percentage">${percentage}%</span>
            <p class="score-message">${getScoreMessage(percentage)}</p>
          </div>
        </div>
        <div class="summary-details">
          <p><strong>Subject:</strong> ${subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
          <p><strong>Difficulty:</strong> ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
        </div>
        <div class="summary-buttons">
          <button onclick="window.viewResults()" class="view-history-btn">View All Results 📊</button>
          <button onclick="setDifficulty('${difficulty}')" class="play-again-btn">Play Again 🔄</button>
        </div>
      </div>
    `;

    // Insert before the badge
    const badge = resultContainer.querySelector('.badge');
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = summaryHTML;
    resultContainer.insertBefore(summaryDiv, badge);
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

    // Handle view results button
    if (viewResultsBtn) {
      viewResultsBtn.addEventListener('click', () => {
        const modal = document.getElementById('resultsModal');
        if (modal) {
          modal.style.display = 'block';
          displayResults();
        }
      });
    }    // Handle modal close button and outside click
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
          if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion();
            updateProgress();
          } else if (skippedQuestions.length > 0) {
            currentQuestionIndex = skippedQuestions[0];
            skippedQuestions.shift();
            showQuestion();
          }
        }
      });
    }
  }

  // Start initialization
  initializeInterface();
}
