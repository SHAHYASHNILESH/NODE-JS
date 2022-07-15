const express=require('express');
const mongoose=require('mongoose');
const userModel=require('./models/userModel');
const app=express();

//middleware function->post, frontend->json
app.use(express.json());
app.listen(3000);

let users=[
    {
        'id':1,
        'Name':'Yash'
    },

    {
        'id':2,
        'Name':'Nilesh'
    },
    {
        'id':3,
        'Name':'Pinal'
    }

];

//mini app
const userRouter=require('./Routers/userRouter');

//base route,router to use
app.use('/users',userRouter);

// userRouter
// .route('/')
// .get(getUser)
// .post(postUser)
// .patch(patchUser)
// .delete(deleteUser)

// userRouter.route('/:id').get(getUserById)

// async function getUser(req,res){
//     //console.log(req.query);
//     //let allUsers=await userModel.find();
//     let allUsers=await userModel.findOne({name:'Pinal'});
//     res.json({
//         message:'List of all users',
//         data:allUsers
//     });
// }

// function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"Data received successfully",
//         user:req.body
//     });
// }

// async function patchUser(req,res){
//     console.log(req.body);
//     let data=req.body;
//     let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},data);
//     // for(key in req.body){
//     //     //console.log(key);
//     //     users[key]=data[key];
//     //     //console.log(users);
//     // }
//     res.json({
//         message:"Data updated successfully"
//     });
// }

// async function deleteUser(req,res){
//     //users={};
//     let dataToBeDeleted=req.body;
//     let user=await userModel.findOneAndDelete(dataToBeDeleted);
//     res.json({
//         message:"Data has been successfully deleted",
//         data:user
//     });
// }

// function getUserById(req,res){
//     console.log(req.params.id);
//     console.log(req.params);
//     res.send("Data received successfully");
// }


// const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(db_link)
// .then(function(db){
//     console.log('db connected successfully');
// })
// .catch(function(err){
//     console.log(err);
// })

// const userSchema=mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8  
//     },
//     confirmPassword:{
//         type:String,
//         required:true,
//         minLength:8
//     }
// });

// const userModel=mongoose.model('userModel',userSchema);