//let flag=false;
function protectRoute(req,res,next){
    if(res.cookie.isLoggedIn){
        next();
    }
    else{
        res.json({
            message:"Operation not allowed"
        })
    }

}

module.exports=protectRoute;