//load env 
if(process.env.Node_ENV !=="production"){
require('dotenv').config()}

//Import depencies 
const express = require("express")
const connectToDb = require("./config/connectToDb")
const noteController =require("./controllers/noteController.js")
const cors =require("cors")


//Creating express server
 const app = express();


//config express 
app.use(express.json())
app.use(cors())

 //connect to database
 connectToDb()

//routing
app.get('/',(req,res)=>{
    res.json({ hello:"server run!Welcome backend" })
});

app.post('/notes',noteController.postNote);

app.get('/notes',noteController.getNotes);

app.get('/notes/:id',noteController.getNoteById);

app.put('/notes/:id',noteController.upadteNote);

app.delete('/notes/:id',noteController.deleteNote);


//start server
app.listen(process.env.PORT)