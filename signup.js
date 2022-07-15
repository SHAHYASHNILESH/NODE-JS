const express=require('express');
const userModel=require('./models/userModel');
const app=express();
const cookieParser=require('cookie-parser');

//middleware function->post, front->json
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

//mini app
const userRouter=require('./Routers/userRouter');
const signUpRouter=require('./Routers/signUpRouter');

//base route,router to use
app.use('/users',userRouter);
app.use('/auth',signUpRouter);

// userRouter
// .route('/setCookie')
// .get(setCookie)

// userRouter
// .route('/getCookie')
// .get(getCookie)

// signUpRouter
// .route('/signup')
// .get(middleware1,getSignUp,middleware2)
// .post(postSignUp)


