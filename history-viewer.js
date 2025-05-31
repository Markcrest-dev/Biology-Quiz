// Quiz History Viewer JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const subjectFilter = document.getElementById('subjectFilter');
  const difficultyFilter = document.getElementById('difficultyFilter');
  const dateFilter = document.getElementById('dateFilter');
  const sortBy = document.getElementById('sortBy');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const historyList = document.getElementById('historyList');
  const noHistory = document.getElementById('noHistory');
  const exportJSON = document.getElementById('exportJSON');
  const exportCSV = document.getElementById('exportCSV');
  const printHistory = document.getElementById('printHistory');

  // Statistics elements
  const totalQuizzesEl = document.getElementById('totalQuizzes');
  const averageScoreEl = document.getElementById('averageScore');
  const bestScoreEl = document.getElementById('bestScore');
  const perfectScoresEl = document.getElementById('perfectScores');
  const subjectChart = document.getElementById('subjectChart');

  let allResults = [];
  let filteredResults = [];

  // Initialize the page
  init();

  function init() {
    loadQuizHistory();
    setupEventListeners();
    updateDisplay();
  }

  function setupEventListeners() {
    subjectFilter.addEventListener('change', updateDisplay);
    difficultyFilter.addEventListener('change', updateDisplay);
    dateFilter.addEventListener('change', updateDisplay);
    sortBy.addEventListener('change', updateDisplay);
    clearHistoryBtn.addEventListener('click', clearAllHistory);
    exportJSON.addEventListener('click', exportAsJSON);
    exportCSV.addEventListener('click', exportAsCSV);
    printHistory.addEventListener('click', printHistoryData);
  }

  function loadQuizHistory() {
    try {
      const stored = localStorage.getItem('quizResults');
      allResults = stored ? JSON.parse(stored) : [];
      console.log('Loaded quiz history:', allResults.length, 'results');
    } catch (error) {
      console.error('Error loading quiz history:', error);
      allResults = [];
    }
  }

  function updateDisplay() {
    filterResults();
    updateStatistics();
    updateSubjectChart();
    renderHistoryList();
  }

  function filterResults() {
    filteredResults = allResults.filter(result => {
      // Subject filter
      if (subjectFilter.value !== 'all' && result.subject !== subjectFilter.value) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter.value !== 'all' && result.difficulty !== difficultyFilter.value) {
        return false;
      }

      // Date filter
      if (dateFilter.value !== 'all') {
        const resultDate = new Date(result.timestamp);
        const now = new Date();
        
        switch (dateFilter.value) {
          case 'today':
            if (resultDate.toDateString() !== now.toDateString()) return false;
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (resultDate < weekAgo) return false;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (resultDate < monthAgo) return false;
            break;
        }
      }

      return true;
    });

    // Sort results
    sortResults();
  }

  function sortResults() {
    const sortValue = sortBy.value;
    
    filteredResults.sort((a, b) => {
      switch (sortValue) {
        case 'date-desc':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'date-asc':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'score-desc':
          return (b.score / b.total) - (a.score / a.total);
        case 'score-asc':
          return (a.score / a.total) - (b.score / b.total);
        case 'subject':
          return a.subject.localeCompare(b.subject);
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
  }

  function updateStatistics() {
    const total = filteredResults.length;
    totalQuizzesEl.textContent = total;

    if (total === 0) {
      averageScoreEl.textContent = '0%';
      bestScoreEl.textContent = '0%';
      perfectScoresEl.textContent = '0';
      return;
    }

    // Calculate average score
    const totalScore = filteredResults.reduce((sum, result) => {
      return sum + (result.score / result.total) * 100;
    }, 0);
    const average = Math.round(totalScore / total);
    averageScoreEl.textContent = `${average}%`;

    // Calculate best score
    const best = Math.max(...filteredResults.map(result => (result.score / result.total) * 100));
    bestScoreEl.textContent = `${Math.round(best)}%`;

    // Calculate perfect scores
    const perfect = filteredResults.filter(result => result.score === result.total).length;
    perfectScoresEl.textContent = perfect;
  }

  function updateSubjectChart() {
    const subjectStats = {};
    
    // Group by subject
    filteredResults.forEach(result => {
      if (!subjectStats[result.subject]) {
        subjectStats[result.subject] = { total: 0, sum: 0, count: 0 };
      }
      subjectStats[result.subject].sum += (result.score / result.total) * 100;
      subjectStats[result.subject].count += 1;
    });

    // Calculate averages
    Object.keys(subjectStats).forEach(subject => {
      subjectStats[subject].average = subjectStats[subject].sum / subjectStats[subject].count;
    });

    // Render chart
    subjectChart.innerHTML = '';
    
    if (Object.keys(subjectStats).length === 0) {
      subjectChart.innerHTML = '<p style="text-align: center; color: #666;">No data to display</p>';
      return;
    }

    Object.entries(subjectStats)
      .sort(([,a], [,b]) => b.average - a.average)
      .forEach(([subject, stats]) => {
        const chartBar = document.createElement('div');
        chartBar.className = 'chart-bar';
        
        chartBar.innerHTML = `
          <div class="chart-label">${capitalizeFirst(subject)}</div>
          <div class="chart-progress">
            <div class="chart-fill" style="width: ${stats.average}%"></div>
          </div>
          <div class="chart-value">${Math.round(stats.average)}%</div>
        `;
        
        subjectChart.appendChild(chartBar);
      });
  }

  function renderHistoryList() {
    historyList.innerHTML = '';
    
    if (filteredResults.length === 0) {
      noHistory.classList.remove('hidden');
      return;
    }
    
    noHistory.classList.add('hidden');
    
    filteredResults.forEach(result => {
      const historyItem = createHistoryItem(result);
      historyList.appendChild(historyItem);
    });
  }

  function createHistoryItem(result) {
    const item = document.createElement('div');
    item.className = 'history-item fade-in';
    
    const percentage = Math.round((result.score / result.total) * 100);
    const date = new Date(result.timestamp);
    
    item.innerHTML = `
      <div class="subject-badge subject-${result.subject}">
        ${getSubjectEmoji(result.subject)} ${capitalizeFirst(result.subject)}
      </div>
      
      <div class="quiz-details">
        <div class="quiz-title">${capitalizeFirst(result.subject)} Quiz</div>
        <div class="quiz-meta">
          <span class="difficulty-badge difficulty-${result.difficulty}">
            ${capitalizeFirst(result.difficulty)}
          </span>
        </div>
      </div>
      
      <div class="score-display">
        <div class="score-number">${result.score}/${result.total}</div>
        <div class="score-percentage">${percentage}%</div>
      </div>
      
      <div class="quiz-date">
        <div>${date.toLocaleDateString()}</div>
        <div>${date.toLocaleTimeString()}</div>
      </div>
    `;
    
    return item;
  }

  function getSubjectEmoji(subject) {
    const emojis = {
      biology: '🧬',
      chemistry: '⚗️',
      mathematics: '📊',
      english: '📚',
      computer: '💻',
      physics: '⚡',
      history: '📜',
      religion: '✝️'
    };
    return emojis[subject] || '📚';
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function clearAllHistory() {
    if (confirm('Are you sure you want to clear all quiz history? This action cannot be undone.')) {
      localStorage.removeItem('quizResults');
      allResults = [];
      updateDisplay();
      alert('Quiz history cleared successfully!');
    }
  }

  function exportAsJSON() {
    const dataStr = JSON.stringify(filteredResults, null, 2);
    downloadFile(dataStr, 'quiz-history.json', 'application/json');
  }

  function exportAsCSV() {
    if (filteredResults.length === 0) {
      alert('No data to export!');
      return;
    }

    const headers = ['Subject', 'Difficulty', 'Score', 'Total', 'Percentage', 'Date', 'Time'];
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(result => {
        const date = new Date(result.timestamp);
        const percentage = Math.round((result.score / result.total) * 100);
        return [
          result.subject,
          result.difficulty,
          result.score,
          result.total,
          `${percentage}%`,
          date.toLocaleDateString(),
          date.toLocaleTimeString()
        ].join(',');
      })
    ].join('\n');

    downloadFile(csvContent, 'quiz-history.csv', 'text/csv');
  }

  function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function printHistoryData() {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent();
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }

  function generatePrintContent() {
    const stats = {
      total: filteredResults.length,
      average: filteredResults.length > 0 ? Math.round(
        filteredResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / filteredResults.length
      ) : 0,
      best: filteredResults.length > 0 ? Math.round(
        Math.max(...filteredResults.map(r => (r.score / r.total) * 100))
      ) : 0
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quiz History Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .stats { display: flex; justify-content: space-around; margin-bottom: 30px; }
          .stat { text-align: center; }
          .stat-number { font-size: 2rem; font-weight: bold; color: #2ecc71; }
          .stat-label { color: #666; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f8f9fa; }
          .score-good { color: #27ae60; font-weight: bold; }
          .score-average { color: #f39c12; font-weight: bold; }
          .score-poor { color: #e74c3c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Quiz History Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="stats">
          <div class="stat">
            <div class="stat-number">${stats.total}</div>
            <div class="stat-label">Total Quizzes</div>
          </div>
          <div class="stat">
            <div class="stat-number">${stats.average}%</div>
            <div class="stat-label">Average Score</div>
          </div>
          <div class="stat">
            <div class="stat-number">${stats.best}%</div>
            <div class="stat-label">Best Score</div>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${filteredResults.map(result => {
              const percentage = Math.round((result.score / result.total) * 100);
              const scoreClass = percentage >= 80 ? 'score-good' : percentage >= 60 ? 'score-average' : 'score-poor';
              const date = new Date(result.timestamp);
              
              return `
                <tr>
                  <td>${capitalizeFirst(result.subject)}</td>
                  <td>${capitalizeFirst(result.difficulty)}</td>
                  <td>${result.score}/${result.total}</td>
                  <td class="${scoreClass}">${percentage}%</td>
                  <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
  }
});
