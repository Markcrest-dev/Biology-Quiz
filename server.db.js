// Simple Node.js Express backend for receiving quiz results and saving to SQLite database

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));  // Serve static files from root directory

// Set up SQLite database
const dbPath = path.join(__dirname, 'quiz_results.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT,
  difficulty TEXT,
  score INTEGER,
  total INTEGER,
  timestamp TEXT
)`);

// Endpoint to receive quiz results
app.post('/api/quiz-result', (req, res) => {
  const { subject, difficulty, score, total, timestamp } = req.body;
  if (!subject || !difficulty || score == null || total == null || !timestamp) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  const stmt = db.prepare('INSERT INTO results (subject, difficulty, score, total, timestamp) VALUES (?, ?, ?, ?, ?)');
  stmt.run(subject, difficulty, score, total, timestamp, function (err) {
    if (err) {
      console.error('Error saving to database:', err);
      return res.status(500).json({ success: false, error: 'Failed to save result' });
    }
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

// Optional: Endpoint to get all results
app.get('/api/quiz-results', (req, res) => {
  db.all('SELECT * FROM results ORDER BY subject, difficulty, timestamp DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to fetch results' });
    }
    res.json({ success: true, results: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Quiz backend server running on http://localhost:${PORT}`);
});
