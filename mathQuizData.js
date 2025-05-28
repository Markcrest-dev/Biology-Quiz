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
    {
      question: "📊 What is the area of a triangle with base 8 and height 6?",
      options: ["24", "48", "16", "32"],
      correct: 0,
      emoji: "📐"
    },
    {
      question: "🎯 Simplify: (x²y³)(xy²)",
      options: ["x³y⁵", "x²y⁴", "x⁴y⁵", "x³y⁶"],
      correct: 0,
      emoji: "✖️"
    },
    {
      question: "📈 What is the slope of the line y = 2x + 3?",
      options: ["2", "3", "1", "0"],
      correct: 0,
      emoji: "📊"
    },
    {
      question: "🔢 Find the value of x: 2(x + 3) = 16",
      options: ["5", "6", "7", "8"],
      correct: 0,
      emoji: "🎯"
    },
    {
      question: "📐 What is the sum of angles in a pentagon?",
      options: ["540°", "360°", "720°", "480°"],
      correct: 0,
      emoji: "⭐"
    },
    {
      question: "🎲 What is 40% written as a decimal?",
      options: ["0.4", "0.04", "4.0", "0.4"],
      correct: 0,
      emoji: "%"
    },
    {
      question: "📊 What is the mean of 15, 20, 25, 30, 35?",
      options: ["25", "24", "26", "27"],
      correct: 0,
      emoji: "📈"
    },
    {
      question: "🔄 Expand: (x + 2)(x - 3)",
      options: ["x² - x - 6", "x² + x - 6", "x² - 5x + 6", "x² + 5x - 6"],
      correct: 0,
      emoji: "✖️"
    }
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
    {
      question: "📈 Find the derivative of y = x³ - 2x + 1",
      options: ["3x² - 2", "3x - 2", "x² - 2", "3x³ - 2"],
      correct: 0,
      emoji: "📊"
    },
    {
      question: "🎯 Solve: log₂(x) = 3",
      options: ["8", "6", "4", "16"],
      correct: 0,
      emoji: "🔢"
    },
    {
      question: "📐 What is the area of a circle with radius 5?",
      options: ["78.54", "75.36", "80.14", "77.14"],
      correct: 0,
      emoji: "⭕"
    },
    {
      question: "🔢 Solve the quadratic equation: x² - 5x + 6 = 0",
      options: ["2 and 3", "1 and 4", "-2 and 3", "3 and 4"],
      correct: 0,
      emoji: "✖️"
    },
    {
      question: "📊 What is the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9?",
      options: ["2", "4", "3", "1.87"],
      correct: 3,
      emoji: "📈"
    },
    {
      question: "🎯 Find the value of sin²(θ) + cos²(θ)",
      options: ["1", "0", "2", "π"],
      correct: 0,
      emoji: "📐"
    },
    {
      question: "📊 What is the volume of a sphere with radius 3?",
      options: ["113.1", "108.9", "116.4", "111.2"],
      correct: 0,
      emoji: "🌐"
    },
    {
      question: "🔢 Solve: |2x - 5| = 7",
      options: ["6 or -1", "5 or -2", "7 or -3", "8 or -4"],
      correct: 0,
      emoji: "🎯"
    }
  ]
};

// Export the quiz data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mathQuizData };
}
