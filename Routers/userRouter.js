const express=require('express');
const userRouter=express.Router();
const protectRoute=require('./authHelper');
const {getUser,getAllUsers,postUser,patchUser,deleteUser}=require('../controller/userController');
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

//Profile Page
app.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific function
app.use(isAuthorised(['admin']))
userRouter
.route('')
.get(getAllUsers)




module.exports=userRouter;