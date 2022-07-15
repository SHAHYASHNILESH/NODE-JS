const express=require('express');
const signUpRouter=express.Router();
const userModel=require('../models/userModel');

signUpRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

signUpRouter
.route('/login')
.post(loginUser)

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
    //console.log('Backend:',user);
    res.json({
        message:"User signed up successfully",
        data:user
    });
}

async function loginUser(req,res){
    try{
        let data=req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                if(user.password==data.password){
                    res.cookie('isLoggedIn',true);
                    res.json({
                        message:"User has logged in successfully",
                        userDetails:data
                    })
        
                }
                else{
                    res.json({
                        message:"Invalid Login credentials"
                    })
                }
            }
            else{
                res.json({
                    message:"User doesn't exist"
                })
            }
        }
        else{
            res.json({
                message:"Empty field found"
            })
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


module.exports=signUpRouter;


