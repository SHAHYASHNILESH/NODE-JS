let SK="sk_test_51LNC4pSHIEvY4K408RgrarDkqSgSCydIo9GTuPT8Ir9JCu3mZhgBjgIfydLTxOrLOMaNZb6s5sHcs2Yq278T19cs003tDujjya";
const stripe = require('stripe')(SK);
const express = require('express');
const userModel=require('../models/userModel');
const planModels=require('../models/planModels');
const app = express();
app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

module.exports.createSession=async function createSession(req,res){
    try{
        let userId=req.id;
        let planId=req.params.id;

        const user=await userModel.findById(planId);
        const plan=await planModels.findById(planId);

        const session = await stripe.checkout.sessions.create({
          payment_method_types:['card'],
          customer_email:user.email,
          client_reference_id:plan.id,
          line_items: [
            {
              name:plan.name,
              description:plan.description,
              //deploy website
              amount:plan.price*100,
              currency:"inr",
              quantity:1
            }
          ],

          //mode: 'payment',
          success_url: `${req.protocol}://${req.get("host")}/profile`,
          cancel_url: `${req.protocol}://${req.get("host")}/profile`
        });
        res.status(200).json({
            status:"success",
            session
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
// app.listen(4242, () => console.log('Running on port 4242'));