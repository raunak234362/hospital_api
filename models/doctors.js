// Importing Mongoose library
const mongoose=require('mongoose');

// Defining mongoose schema for the 'Doctor' Model
const doctorSchemas= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter your name']
    },
    password:{
        type : String ,  //password is a string data type
        required:[true,'Please Enter your password'],
        minLength:[6,'Password should be greater than 6']
    },
    
})

// Creating mongoose model named 'Doctor' Based on the defined schema
const Doctor=new mongoose.model("Doctor",doctorSchemas)

// Exporting the model for use in other parts of the application
module.exports=Doctor;