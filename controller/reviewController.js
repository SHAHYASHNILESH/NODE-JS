const planModels = require('../models/planModels');
const reviewModel=require('../models/reviewModel');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const users=await reviewModel.find();
        if(users){
            res.json({
                message:'All Reviews retrieved successfully',
                data:users
            });
        }
        else{
            res.json({
                message:'No Reviews Found'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.getPlanReview=async function getPlanReview(req,res){
    try{
        let id=req.params.id;
        let user=await reviewModel.findById(id);
        if(user){
            res.json({
                message:'Plan Review recieved successfully',
                data:user
            });
        }
        else{
            res.json({
                message:'No Review Found for this Plan'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            ratings:-1
        }).limit(3);
        res.json({
            message:'Top 3 reviews received successfully',
            data:reviews
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModels.findById(id);
        let data=req.body;
        const review=await reviewModel.create(data);
        const noOfSchema=plan.noOfSchema+1;
        plan.ratingsAverage=(plan.ratingsAverage+data.ratings)/(noOfSchema);
        await plan.save();
        if(review){
            res.json({
                message:'Review created successfully',
                data:review
            });
        }
        else{
            res.json({
                message:'No Review created'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.updateReview=async function updateReview(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        // console.log(id);
        // console.log(dataToBeUpdated);
        let review=await reviewModel.findById(id);
        let keys=[];
        for (let key in dataToBeUpdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        const updatedData=await review.save();
        //console.log(plan);
        res.json({
            message:"Review data updated successfully",
            data:review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let id=req.params.id;
        let review=await reviewModel.findByIdAndDelete(id);
        if(review){
            res.json({
                message:'Review deleted successfully',
                data:review
            });
        }
        else{
            res.json({
                message:'No Review deleted',
                data:review
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
} 