const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');

//user signup
module.exports.signup=async function postSignUp(req,res){
    try{
    //let obj=req.body;
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    if(user){
        //console.log('Backend:',user);
        res.json({
            message:"User signed up successfully",
            data:user
        });
    }
    else{
        res.json({
            message:"Error occured while signing up"
        })
    }
 }
 catch(err){
    res.json({
        message:err.message
    })
 }
}

//user login
module.exports.loginUser=async function loginUser(req,res){
    try{
        let data=req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                if(user.password==data.password){
                    let uid=user['_id'];
                    let tokens=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',tokens,{httpOnly:true});
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


//isAuthorised->to check the user's role(admin,user,owner,deliveryboy)
module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"Operation not allowed"
            });
        }
    }
}


module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
    let token;
    if(req.cookies.login){
        token=req.cookies.login;
        let payload=jwt.verify(token,JWT_KEY);
        if(payload){
            let user=await userModel.findById(payload.payload);
            req.role=user.role;
            req.id=user.id;
            next();
            // res.json({
            //     message:"User Verified successfully"
            // });
        }
        else{
            res.json({
                message:"User Not verified"

            });
        }
    }
    else{
        res.json({
            message:"Please login"
        })
    }
  }
  catch(err){
        res.json({
            message:err.message
        });
  }
}


//forget password
module.exports.forgetpassword=async function forgetpassword(req,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to user
            //nodemailer
        }
        else{
            res.json({
                message:"Please signup"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }

}

//reset password
module.exports.resetpassword=async function resetpassword(req,res){
    try{
    const token=req.params.token;
    let {password,confirmPassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    if(user){
        user.resetPasswordHandler(password,confirmPassword);
        user.save();
        res.json({
            message:"Password changed successfully and please login again"
        });

    }
    else{
        res.json({
            message:"User Not Found"
        })
    }
  }
  catch(err){
    res.json({
        message:err.message

    });
  }

}