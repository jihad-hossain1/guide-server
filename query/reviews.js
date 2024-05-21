const {
  GraphQLID,
  GraphQLList,
} = require("graphql");
const {  ReviewType } = require("../typeDef/typeDef");
const Review = require("../models/Review");




let reviesByTourSpot = {
    type: new GraphQLList(ReviewType),
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const fetchData = await Review.find();
        let result = fetchData?.filter((item) => item?.tourSpotId == args?.id);
        return result;
    },
};


let newReviews = {
  type: new GraphQLList(ReviewType),
  args: { id: { type: GraphQLID } },
  resolve: async(parent, args) =>{
    try {
      return await Review.findById(args.id);
    } catch (error) {
      return error;
    }
  },
};






module.exports = {  reviesByTourSpot,newReviews };
