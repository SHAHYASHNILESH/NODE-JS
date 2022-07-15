const express=require('express');
const userModel=require('../models/userModel');
const userRouter=express.Router();
const protectRoute=require('./authHelper');

userRouter
.route('/')
.get(protectRoute,getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser)

userRouter.route('/:id').get(getUserById)

userRouter
.route('/setCookie')
.get(setCookie)

userRouter
.route('/getCookie')
.get(getCookie)




async function getUser(req,res){
    //console.log(req.query);
    //let allUsers=await userModel.find();
    let allUsers=await userModel.findOne({name:'Pinal'});
    res.json({
        message:'List of all users',
        data:allUsers
    });
}

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"Data received successfully",
        user:req.body
    });
}

async function patchUser(req,res){
    console.log(req.body);
    let data=req.body;
    let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},data);
    // for(key in req.body){
    //     //console.log(key);
    //     users[key]=data[key];
    //     //console.log(users);
    // }
    res.json({
        message:"Data updated successfully"
    });
}

async function deleteUser(req,res){
    //users={};
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"Data has been successfully deleted",
        data:user
    });
}

function getUserById(req,res){
    console.log(req.params.id);
    console.log(req.params);
    res.send("Data received successfully");
}

function setCookie(req,res){
    //res.setHeader('Set-Cookie','isLoggedIn=false')
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('Cookies has been sent successfully');
}

function getCookie(req,res){
    let cookies=req.cookies;
    let cookies1=req.cookies.isLoggedIn;
    console.log(cookies);
    console.log(cookies1);
    res.send('Cookies received successfully');

}


module.exports=userRouter;