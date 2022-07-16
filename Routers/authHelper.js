//let flag=false;
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');

function protectRoute(req,res,next){
    if(req.cookies.login){
        let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();

        }
        else{
            res.json({
                message:"User Not verified"

            });
        }
    }
    else{
        res.json({
            message:"Operation not allowed"
        })
    }

}

module.exports=protectRoute;