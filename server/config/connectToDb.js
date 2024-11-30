
const mongoose = require("mongoose")
async function connectToDb(){
    try{

        await  mongoose.connect(process.env.Db_URL)
        console.log("connected to database222")
    }catch(err){
        console.log(err,"err in connecting database")
    }}
module.exports = connectToDb;