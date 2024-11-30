const Note =require ("../models/note.js")
//post data
const postNote = async (req, res) => {
    // Get the data from the request body
    const { title, body } = req.body;

    try {
        // Create a note
        const note = await Note.create({ title, body });

        // Respond with the new note
        res.status(201).json({ success: true, note });
    } catch (error) {
        // Handle unique constraint errors (e.g., duplicate titles)
        if (error.code === 11000) { // MongoDB duplicate key error code
            res.status(400).json({ 
                success: false, 
                message: "user already exists" 
            });
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).json({ 
                success: false, 
                message: "An error occurred while creating the note." 
            });
        }
    }
};

//get data
const getNotes = async(req,res)=>{
    //find the notes 
      const notes = await Note.find()

    //respond with them
    res.json({notes:notes})
}

//get data by id
const getNoteById = async(req,res)=>{
    //get id fro params
    const noteId = req.params.id;


    //get single person by id
      const notes = await Note.findById(noteId)

      //response note
      res.json({notes:notes})
}

//update data
const updateNote = async(req,res)=>{
    //get id from params
   const noteId = req.params.id;

    //find and update the note
     await Note.findByIdAndUpdate(noteId,{
        title:req.body.title,
        body:req.body.body,
     })
     //get updatednote
     const notes =await Note.findById(noteId) 
    
     //respond with it 
      res.json({notes:notes})

}

//delete data
const deleteNote = async(req,res)=>{
    //get id
    const noteId = req.params.id;
      //delete note
      const notes = await Note.findByIdAndDelete(noteId)
      //response 
      res.json({ message: `Success: record deleted, ID: ${noteId}` });
    }

module.exports={
    postNote : postNote,
    getNotes : getNotes,
    getNoteById : getNoteById,
    upadteNote :updateNote,
    deleteNote : deleteNote,

}
