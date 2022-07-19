const userModel=require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    //console.log(req.query);
    //let allUsers=await userModel.find();
    let id=req.params.id;
    let user=await userModel.findById(id);
    // let allUsers=await userModel.findOne({name:'Pinal'});
    if(user){
        res.json({
            message:'List of specific user',
            data:user
        });
   }
   else{
    res.json({
        message:"User Not Found"
    });
   }
}

module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"Data received successfully",
        user:req.body
    });
}

module.exports.patchUser=async function patchUser(req,res){
    //console.log(req.body);
    try{
        let id=req.params.id;
        let user=await userModel.findById(id);
        let data=req.body;
        if(user){
             const keys=[];
             for(let key in data){
                 keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=data[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message:"Data updated successfully",
                data:user
            });
       }
       else{
           res.json({
            message:"User Not found"
           });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }    
}

module.exports.deleteUser=async function deleteUser(req,res){
  //users={};
  try{
      let id=req.params.id;
      let user=await userModel.findByIdAndDelete(id);
      if(!user){
        res.json({
            message:"User Not Found"
        });
      }
      res.json({
          message:"Data has been successfully deleted",
          data:user
      });
  }
  catch(err){
    res.json({
        message:err.message
    });
  }
}

module.exports.getAllUsers=async function getAllUsers(req,res){
    try{
    let users=await userModel.find();
    if(users){
        res.json({
            message:"Users Recieved Successfully",
            data:users
        });
    }
    else{
        res.json({
            message:"No users Found"
        });
    }
  }
  catch(err){
    res.json({
        message:err.message
    });
  }
// console.log(req.params.id);
// console.log(req.params);
// res.send("Data received successfully");
}


module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
        message:'File uploaded successfully'
    });
}









// function setCookie(req,res){
//     //res.setHeader('Set-Cookie','isLoggedIn=false')
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('Cookies has been sent successfully');
// }

// function getCookie(req,res){
//     let cookies=req.cookies;
//     let cookies1=req.cookies.isLoggedIn;
//     console.log(cookies);
//     console.log(cookies1);
//     res.send('Cookies received successfully');

// }



