import express from 'express';
const app = express();  
// import all necessary functions we need from database.js. 
import {getNotes, getNote, createNote} from './database.js'

// any json body will be parsed into req.body object. 
app.use(express.json()); 


// check all notes. 
app.get("/notes", async(req, res) => {
    const notes = await getNotes(); 
    res.send(notes); 
})
// check specific note. 
app.get("/notes/:id", async (req, res) => {
    const id = req.params.id; 
    const note = await getNote(id); 
    res.send(note); 
})

// create note 
app.post("/notes", async(req, res) => {
    const {title, contents} = req.body; 
    const note = await createNote(title, contents); 
    res.status(201).send(note); 
})


app.get("/", (req, res) =>{ 
    res.send('Home Page !!!')
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! 🌰')
  })


app.listen(8080, () => {
    console.log("Server is running on port 8080")
})