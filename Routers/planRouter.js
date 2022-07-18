const express=require('express');
const { isAuthorised, protectRoute} = require('../controller/authController');
const {getPlan,getAllPlans,createPlan,updatePlan,deletePlan}=require('../controller/planController');

const planRouter=express.Router();

//gets all plans
planRouter
.route('/allPlans')
.get(getAllPlans)

//own plan->check logged in or not 
planRouter.use(protectRoute)

planRouter
.route('/plan/:id')
.get(getPlan)

//admin and restaurant owner can create,update and delete operations 
planRouter.use(isAuthorised(['admin','owner']))
planRouter
.route('/crplan')
.post(createPlan)

planRouter
.route('/udplan/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports=planRouter;