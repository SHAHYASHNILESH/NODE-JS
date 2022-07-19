const express=require('express');
const { protectRoute } = require('../controller/authController');
const {createSession}=require('../controller/bookingController')
const bookingRouter=express.Router();

bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile('C:/Users/YASH SHAH/OneDrive/NODE-JS/booking.html');
})

module.exports=bookingRouter;
