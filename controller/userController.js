const Doctor=require('../models/doctors');
const Patient=require('../models/patient');
const jwt=require('jsonwebtoken');

module.exports.registerDoctor=async(req,res,next)=>{
    try{
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

module.exports.login= async (req,res,next)=>{
    try{
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

module.exports.registerPatient= async(req,res,next)=>{
    try {
        req.body.doctor="651c143b1ecc83760e20d6f8";
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

module.exports.createReport =async(req,res,next)=>{
    try{
        const patient=await Patient.findById(req.params.id);
  
        req.body.date=Date.now();
        patient.reports.push(req.body);
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

module.exports.all_reports=async(req,res,next)=>{
    try{
        const patient=await Patient.findById(req.params.id);

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

module.exports.AllReports=async(req,res,next)=>{
    try{
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