const mongoose=require('mongoose');

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

const Doctor=new mongoose.model("Doctor",doctorSchemas)

module.exports=Doctor;