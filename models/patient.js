// Importing the mongoose library
const mongoose=require('mongoose');

// Defing a mongoose schema for the patient model
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:(true,'Please enter patient name'),
    },
    reports:[
        {
            status:{
                type:String,
                required:true,
                enum:["Negative","Travelled-Quarantine","Symptoms-Quarantine","Posive-Admit"],
            },
            date:{
                type:Date,
                required:true,
            }
        }
    ],
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor", // Reference to the doctor model
        required:true,
    }
});

// Creating a mongoose model named 'Patient' based on the defined schema
const Patient=new mongoose.model("Patient",patientSchema);

// Exporting the 'Patient' model for use in other parts of the application
module.exports=Patient;