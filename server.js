const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'postgres',
  password: 'hemanthram143',
  database: 'postgres'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle student login
app.post('/student-login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM students WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.length === 0) {
      return res.status(401).send('Incorrect username or password');
    }
    res.status(200).send('Student login successful');
  });
});

// Route to handle teacher login
app.post('/teacher-login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM teachers WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.length === 0) {
      return res.status(401).send('Incorrect username or password');
    }
    res.status(200).send('Teacher login successful');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
