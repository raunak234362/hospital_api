const Doctor=require('../models/doctors'); // Importing the Doctor model
const Patient=require('../models/patient'); // Importing the Patient model
const jwt=require('jsonwebtoken'); // Importing JSON Web Token libraty

// Controller to register a doctor
module.exports.registerDoctor=async(req,res,next)=>{
    try{
        // Create a new doctor based on the request body
        const doctor= await Doctor.create(req.body);

        res.status(200).json({
            success:true,
            message:"doctor created successful"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message:"could not create a doctor, internal server error"
        });
    }
};

// Controller for doctor login
module.exports.login= async (req,res,next)=>{
    try{
        // Find a doctor based on the request body
        const user=Doctor.find(req.body);

        if(user){
            const token=jwt.sign(user.id,"secret");
            req.status(200).json({
              success:true,
              token,
            });
        }else{
            res.status(400).json({
                success:true,
                message:"name or password is invalid",
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

// Controller to register a patient
module.exports.registerPatient= async(req,res,next)=>{
    try {
        // Assign a doctor to the patient based on the doctor's ID
        req.body.doctor="651c143b1ecc83760e20d6f8";
         // Create a new patient based on the request body
        const patient=await Patient.create(req.body);

        res.status(200).json({
            success:true,
            message:"successfully create the patient"
        })
    } catch(error){
        res.status(500).json({
            success:false,
            message:"Couldn't create a patient, internal server error"
        });
    }
}

// Controller to create a patient report
module.exports.createReport =async(req,res,next)=>{
    try{
        // Find a patient by ID
        const patient=await Patient.findById(req.params.id);
         // Add the current date to the report
        req.body.date=Date.now();
        // Push the report into the patient's reports array
        patient.reports.push(req.body);
         // Save the patient data with the new report
        await patient.save();

        res.status(200).json({
            success:true,
            message:"Report submitted successfully",
        })

    } catch(error){
        res.status(400).json({
            success:false,
            message:"Couldn't created a report, internal server error "
        });
    }
};

// Controller to get all reports for a patient
module.exports.all_reports=async(req,res,next)=>{
    try{
        const patient=await Patient.findById(req.params.id); // Find a patient by ID and return their reports

        res.status(200).json({
            success:true,
            reports:patient.reports,
        })

    }catch(error){
        req.status(500).json({
            success:false,
            message:"Couldn't able to fetch the patient reports",
        });
    }
};

// Controller to get all reports with a specific status
module.exports.AllReports=async(req,res,next)=>{
    try{
        // Find all patients with reports matching the specified status
        const patient=await Patient.find({reports:{$elemMatch:{status:req.params.status}},
        });

        res.status(200).json({
            success:true,
            data:patient,
        })

    }catch(error){
        req.status(500).json({
            success:false,
            message:"All Reports not fetched"
        })
    }
}