const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Your MySQL username
  password: '',     // Your MySQL password
  database: 'eventdb'  // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');

  // Create events table if not exists
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

// Function to add a new event
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

// Function to get all events
function getAllEvents(callback) {
  const selectQuery = 'SELECT * FROM events ORDER BY created_at DESC';
  
  connection.query(selectQuery, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

// Export the functions
module.exports = {
  connection,
  addEvent,
  getAllEvents
};