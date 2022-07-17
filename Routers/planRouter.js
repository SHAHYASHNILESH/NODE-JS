const express=require('express');
const { isAuthorised, protectRoute} = require('../controller/authController');
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
planRouter.use(isAuthorised['admin','owner'])
planRouter
.route('/crudplan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)