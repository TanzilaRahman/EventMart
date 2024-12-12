const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '',    
  database: 'eventdb'

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');

  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      eventName VARCHAR(255) NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating events table: ' + err.stack);
      return;
    }
    console.log('Events table ensured.');
  });
});


function addEvent(eventData, callback) {
  const { eventName, firstName, lastName, location, date, description } = eventData;
  
  const insertQuery = `
    INSERT INTO events 
    (eventName, firstName, lastName, location, date, description) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery, 
    [eventName, firstName, lastName, location, date, description], 
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
}


function getAllEvents(callback) {
  const selectQuery = 'SELECT * FROM events ORDER BY created_at DESC';
  
  connection.query(selectQuery, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}


module.exports = {
  connection,
  addEvent,
  getAllEvents
};
