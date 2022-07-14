const express=require('express');
const mongoose=require('mongoose');
const app=express();

//middleware function->post, front->json
app.use(express.json());
app.listen(3000);

//mini app
const signUpRouter=express.Router();

//base route,router to use
app.use('/auth',signUpRouter);

signUpRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

function middleware1(req,res,next){
    console.log('Middleware 1 gets called');
    next();
}
function middleware2(req,res){
    console.log('Middleware 2 gets called');
    console.log('Middleware 2 has ended the request/response cycle');
    res.sendFile('/views/form.html',{root:__dirname});
}

function getSignUp(req,res,next){
    console.log('Get signup called');
    //res.sendFile('/views/form.html',{root:__dirname});
    next();
}

async function postSignUp(req,res){
    //let obj=req.body;
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    console.log('Backend:',user);
    res.json({
        message:"User signed up successfully",
        data:user
    });
}

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8  
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
});

const userModel=mongoose.model('userModel',userSchema);
// (async function createUser(){
//     let user={
//         name:'Nilesh',
//         email:'nileshshah0409@yahoo.co.in',
//         password:'87654321',
//         confirmPassword:'87654321'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();