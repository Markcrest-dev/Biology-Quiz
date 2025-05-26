const mathQuizData = {
  easy: [
    {
      question: "➕ What is 25 + 37?",
      options: ["62", "61", "63", "64"],
      correct: 0,
      emoji: "🔢"
    },
    {
      question: "✖️ What is 8 × 7?",
      options: ["56", "54", "58", "52"],
      correct: 0,
      emoji: "✖️"
    },
    {
      question: "➗ What is 81 ÷ 9?",
      options: ["9", "8", "7", "10"],
      correct: 0,
      emoji: "➗"
    },
    {
      question: "📐 How many sides does a hexagon have?",
      options: ["6", "5", "7", "8"],
      correct: 0,
      emoji: "⬡"
    },
    {
      question: "🔢 What is 15% of 200?",
      options: ["30", "35", "25", "40"],
      correct: 0,
      emoji: "%"
    },
    {
      question: "📏 What is the perimeter of a square with sides of 5 units?",
      options: ["20 units", "25 units", "15 units", "10 units"],
      correct: 0,
      emoji: "⬜"
    },
    {
      question: "➖ What is 143 - 65?",
      options: ["78", "77", "79", "76"],
      correct: 0,
      emoji: "➖"
    },
    {
      question: "📊 What is the mode of: 2, 3, 3, 4, 5, 3, 6?",
      options: ["3", "4", "5", "2"],
      correct: 0,
      emoji: "📊"
    },
    {
      question: "🎯 What is the next number: 2, 4, 8, 16, ...?",
      options: ["32", "24", "28", "30"],
      correct: 0,
      emoji: "🔄"
    },
    {
      question: "💫 How many degrees are in a complete circle?",
      options: ["360", "180", "270", "90"],
      correct: 0,
      emoji: "⭕"
    }
  ],
  medium: [
    {
      question: "📐 What is the square root of 144?",
      options: ["12", "14", "10", "16"],
      correct: 0,
      emoji: "√"
    },
    {
      question: "🔢 Solve: 3x + 7 = 22",
      options: ["5", "6", "4", "7"],
      correct: 0,
      emoji: "🎯"
    },
    // ... Add 8 more medium questions
  ],
  hard: [
    {
      question: "📊 What is the probability of rolling two dice and getting a sum of 7?",
      options: ["1/6", "1/8", "1/12", "1/4"],
      correct: 0,
      emoji: "🎲"
    },
    {
      question: "📐 What is the cosine of 60 degrees?",
      options: ["0.5", "0.866", "0.707", "1"],
      correct: 0,
      emoji: "📐"
    },
    // ... Add 8 more hard questions
  ]
};

// Export the quiz data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mathQuizData };
}
