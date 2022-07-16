const express=require('express');
const userRouter=express.Router();

const {getUser,getAllUsers,postUser,patchUser,deleteUser}=require('../controller/userController');
const {signup,isAuthorised,loginUser,protectRoute}=require('../controller/authController');
const {forgetpassword,resetpassword}=require('../controller/authController');
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