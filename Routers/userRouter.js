const express=require('express');
const userRouter=express.Router();
const protectRoute=require('./authHelper');
const {getUser,getUserById,postUser,patchUser,deleteUser}=require('../controller/userController');
userRouter
.route('/')
.get(protectRoute,getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser)

userRouter.route('/:id').get(getUserById)

// userRouter
// .route('/setCookie')
// .get(setCookie)

// userRouter
// .route('/getCookie')
// .get(getCookie)


module.exports=userRouter;