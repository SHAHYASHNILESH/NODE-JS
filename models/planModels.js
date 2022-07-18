const mongoose=require('mongoose');

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,'Plan name cannot exceed 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'Price not entered']
    },
    ratingsAverage:{
        type:Number,
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        },'Discount should not exceed the price']
    }
});


const planModels=mongoose.model('planModels',planSchema);
// (async function createPlan(){
//     let planObj={
//         name:'SuperFood101',
//         duration:30,
//         price:1000,
//         ratingsAverage:4,
//         discount:30
//     }
//     let data=await planModels.create(planObj);
//     console.log(data);
//     // const doc=new planModels(planObj);
//     // await doc.save();

// })();

module.exports=planModels;
