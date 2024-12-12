const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuring MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'events_db', 
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to MySQL');
    setupDatabase(); 
  });

  const setupDatabase = () => {
    
    db.query(`CREATE DATABASE IF NOT EXISTS events_db`, (err) => {
      if (err) {
        console.error('Failed to create database:', err);
        return;
      }
      console.log('Database created or already exists');
    });
    
   
    db.query(`USE events_db`, (err) => {
      if (err) {
        console.error('Failed to switch to database:', err);
        return;
      }
      console.log('Using database events_db');
    });
  
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eventName VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL
      )
    `;
    db.query(createTableQuery, (err) => {
      if (err) {
        console.error('Failed to create table:', err);
        return;
      }
      console.log('Table created or already exists');
    });
  };
  

// Endpoint to add an event
app.post('/add-event', (req, res) => {
  const { eventName, firstName, lastName, location, date, description } = req.body;

  const query = `
    INSERT INTO events (eventName, firstName, lastName, location, date, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [eventName, firstName, lastName, location, date, description], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to create event');
    } else {
      res.send('Event added successfully');
    }
  });
});

// Endpoint to fetch events
app.get('/events', (req, res) => {
  const query = `SELECT * FROM events`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to fetch events');
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});