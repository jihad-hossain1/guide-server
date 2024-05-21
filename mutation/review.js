const {
  GraphQLID,
    GraphQLString, 
  GraphQLInt
} = require("graphql");

const { ReviewType } = require("../typeDef/typeDef");
const Review = require("../models/Review");
const TourSpot = require("../models/TourSpot");





const addReview = {
    type: ReviewType,
    args: {
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    rating: { type: GraphQLInt },
    tourSpotId: { type: GraphQLID },
    },
    resolve: async (parent, args) => {
        try {
            const review = new Review(args);
            return await review.save();
        } catch (error) {
            throw new Error("Error adding review");
        }
    },
};

const addReviewReply = {
    type: ReviewType,
    args: {
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    rating: { type: GraphQLInt },
    tourSpotId: { type: GraphQLID },
    },
    // resolve: async (parent, args) => {
    //     try {
    //         const review = new Review(args);
    //         return await review.save();
    //     } catch (error) {
    //         throw new Error("Error adding review");
    //     }
  // },
     resolve(parent, args) {
        const review = new Review(args);

        return Promise.all([
          review.save(),
          TourSpot.findByIdAndUpdate(
            args.tourSpotId,
            { $push: { reviews: review._id } },
            { new: true }
          ),
        ]).then(([savedReview, updatedTourspot]) => savedReview);
      },
};


const addReply = {
    type: ReviewType,
    args: {
    name: { type: GraphQLString },
    content: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    reviewId: { type: GraphQLID },
    },
   
  async resolve(parent, args) {
        const reply = new Review(args);

        const savedReply = await reply.save();

        const parentReview = await Review.findByIdAndUpdate(
          args.reviewId,
          { $push: { replies: savedReply._id } },
          { new: true }
        );

        return savedReply;
      },
};


const updateReview = {
    type: ReviewType,
      args: {
        reviewId: { type: GraphQLID },
        newContent: { type: GraphQLString },
      },
      async resolve(parent, { reviewId, newContent }) {
        // Find the review by ID and update its content
        const updatedReview = await Review.findByIdAndUpdate(
          reviewId,
          { $set: { content: newContent } },
          { new: true }
        );

        return updatedReview;
      },
};


const updateReply = {
    type: ReviewType,
      args: {
        replyId: { type: GraphQLID },
        newContent: { type: GraphQLString },
      },
      async resolve(parent, { replyId, newContent }) {
        // Find the review by ID and update its content
        const updatedReply = await Review.findByIdAndUpdate(
          replyId,
          { $set: { content: newContent } },
          { new: true }
        );

        return updatedReply;
      },
};


const deleteReviewWithReply = {
 
      type: ReviewType,
      args: {
        reviewId: { type: GraphQLID },
      },
      async resolve(parent, { reviewId }) {
        // Find the review by ID
        const review = await Review.findById(reviewId);

        // Remove the review and its replies
        await Review.deleteMany({ _id: { $in: [reviewId, ...review.replies] } });

        // Remove the review from the post
        await TourSpot.updateOne({ 'reviews._id': reviewId }, { $pull: { reviews: { _id: reviewId } } });

        return review;
      },
  
};



const deleteReply = {
  type: GraphQLID,
  args: {
    replyId: { type: GraphQLID },
  },
  async resolve(parent, { replyId }) {
    // Find the reply by ID and remove it
    await Review.findByIdAndDelete(replyId);

    // Remove the reply ID from the parent comment
    const review = await Review.findOneAndUpdate(
      { 'replies': replyId },
      { $pull: { 'replies': replyId } },
      { new: true }
    );

    return replyId;
  },
};

module.exports = { addReview,addReviewReply,addReply,deleteReviewWithReply,updateReview,updateReply,deleteReply };