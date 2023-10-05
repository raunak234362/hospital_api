// Importing mongoose
const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://raunak:1234@cluster0.k9azr0j.mongodb.net/?retryWrites=true&w=majority');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to MOngoDB"));

db.once("open",()=>{
    console.log("Successfully connected to the database")
})

module.exports=db;