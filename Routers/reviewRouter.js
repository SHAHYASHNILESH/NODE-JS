const express=require('express');
const reviewRouter=express.Router();

reviewRouter
.route('/allReviews')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3reviews)

reviewRouter
.route('/:id')
.get(getPlanReview)

reviewRouter
.route('/')
.post(createReview)

reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)


module.exports=reviewRouter;