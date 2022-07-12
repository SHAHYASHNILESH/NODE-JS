const express=require('express');
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

function postSignUp(req,res){
    let obj=req.body;
    console.log('Backend:',obj);
    res.json({
        message:"User signed up successfully",
        data:obj
    });
}
