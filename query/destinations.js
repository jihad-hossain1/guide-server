const {
  GraphQLID,
    GraphQLList, 
  GraphQLString,
} = require("graphql");
const { DestinationType } = require("../typeDef/typeDef");
const Destination = require("../models/Destination");




const destinations = {
    type: GraphQLList(DestinationType),
    resolve: async () => {
        try {
            return await Destination.find();
        } catch (error) {
            throw new Error("Error fetching destinations");
        }
    },
};





const destination = {
    type: DestinationType,
    args: {
        id: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        try {
            return await Destination.findById(args.id);
        } catch (error) {
            throw new Error("Error fetching destination");
        }
    },
};



    module.exports = {destination,destinations}