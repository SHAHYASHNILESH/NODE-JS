const express=require('express');
const reviewRouter=express.Router();
const {getAllReviews,top3Reviews,getPlanReview,createReview,updateReview,deleteReview}=require('../controller/reviewController');

reviewRouter
.route('/allReviews')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3Reviews)

reviewRouter
.route('/:id')
.get(getPlanReview)

reviewRouter
.route('/:plan')
.post(createReview)

reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)


module.exports=reviewRouter;