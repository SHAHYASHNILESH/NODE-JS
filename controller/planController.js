const planModels=require('../models/planModels');

module.exports.getAllPlans=async function getAllPlans(req,res){
    try{
        let plans=await planModels.find();
        if(plans){
            res.json({
                message:'All Plans received successfully',
                data:plans
            });
        }
        else{
            res.json({
                message:"Plans not Found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.getPlan=async function getPlan(req,res){
    try{
        let id=req.params.id;
        let plan=await planModels.findById(id);
        if(plan){
            res.json({
                message:'Plan received successfully',
                data:plan
            });
        }
        else{
            res.json({
                message:"Plan not Found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.createPlan=async function createPlan(req,res){
    try{
        let planData=req.body;
        let createdPlan=await planModels.create(planData);
        res.json({
            message:'Plan created successfully',
            data:createdPlan
        }); 
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.deletePlan=async function deletePlan(req,res){
    try{
        let id=req.params.id;
        let deletedPlan=await planModels.findByIdAndDelete(id);
        if(deletedPlan){
            res.json({
                message:'Plan deleted successfully',
                data:deletedPlan
            });
        }
        else{
            res.json({
                message:'Plan not Found',    
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }

}

module.exports.updatePlan=async function updatePlan(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        // console.log(id);
        // console.log(dataToBeUpdated);
        let plan=await planModels.findById(id);
        let keys=[];
        for (let key in dataToBeUpdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        const updatedData=await plan.save();
        //console.log(plan);
        res.json({
            message:"Data updated successfully",
            data:plan
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.top3plan=async function top3plan(req,res){
    try{
        const plans=await planModels.find().sort({
            ratingsAverage:-1
        }).limit(3);

        res.json({
            message:'Top 3 Plans received successfully',
            data:plans
        })


    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
