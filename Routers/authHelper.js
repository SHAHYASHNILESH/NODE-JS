//let flag=false;
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');

module.exports=protectRoute;