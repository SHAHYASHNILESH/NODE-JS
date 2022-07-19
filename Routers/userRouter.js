const express=require('express');
const userRouter=express.Router();

const {getUser,getAllUsers,postUser,patchUser,deleteUser,updateProfileImage}=require('../controller/userController');
const {signup,isAuthorised,loginUser,protectRoute}=require('../controller/authController');
const {forgetpassword,resetpassword,logout}=require('../controller/authController');
const multer=require('multer');

const app=express();

// userRouter
// .route('/')
// .get(protectRoute,getUser)
// .post(postUser)
// .patch(patchUser)
// .delete(deleteUser)

// userRouter.route('/:id').get(getUserById)

// userRouter
// .route('/setCookie')
// .get(setCookie)

// userRouter
// .route('/getCookie')
// .get(getCookie)

//user operations
userRouter
.route('/:id')
.patch(patchUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(loginUser)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)


const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images');
    },
    filename:function(req,file,cb){
        cb(nill,`user-${Date.now()}.jpeg`);
    }
});

const filter=function(req,file,cb){
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(new Error('Not an image!Please upload an image'),false)
    }
}

const upload=multer({
    storage:multerStorage,
    fileFilter:filter
});

userRouter.post("/ProfileImage",upload.single('photo'),updateProfileImage);

userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile('C:/Users/YASH SHAH/OneDrive/NODE-JS/public/images/practice.jpeg');
});

//Profile Page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)


//admin specific function
userRouter.use(isAuthorised(['admin']))
userRouter
.route('/')
.get(getAllUsers)

module.exports=userRouter;