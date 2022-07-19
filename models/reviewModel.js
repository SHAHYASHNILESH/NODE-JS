const mongoose=require('mongoose');

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const reviewSchema=mongoose.Schema({
    review:{
        type:String,
        required:[true,'Review is required']
    },
    ratings:{
        type:Number,
        required:[true,'Rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'Review must belong to user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModels',
        required:[true,'Review must belong to plan']
    },

});

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:"name profileImage"
    }).populate("plan");
    next();
});

const reviewModel=mongoose.model('reviewModel',reviewSchema);


module.exports=reviewModel;