import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();


// Have pool of collections that can be reused. 
// promise will allowed us to use api version of mysql instead of having to use callback functions. 
const pool =  mysql.createPool({
  host: process.env.MYSQL_HOST, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE
}).promise();  


// get all notes. 
async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;  
}


// get singular note. 
async function getNote(id) {
  const [rows] = await pool.query(`
    SELECT * FROM notes WHERE id = ?
  `, [id])
  // rows[0] will help us sending undefined if the id doesn't exist. 
  return rows[0]
}

// create a new note. 
async function createNote(title, contents) {
  const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
  `, [title, contents])
  
  const id = result.insertId; 
  return getNote(id)
}

const note = await getNote(100); 

const notes = await getNotes(); 
console.log(note); 



const result = await createNote('test', 'test'); 
console.log(result); 

export {getNote, getNotes, createNote}; 