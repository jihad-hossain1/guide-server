const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { DestinationType } = require("../typeDef/typeDef");
const Destination = require("../models/Destination");







const addDestination = {
    type: DestinationType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        photo: { type: GraphQLString },
        location: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        try {
            const destination = new Destination(args);
            return await destination.save();
        } catch (error) {
            throw new Error("Error adding destination");
        }
    },
};
  





const updateDestination = {
    type: DestinationType,
    args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        try {
            return await Destination.findByIdAndUpdate(
                args.id,
                {
                    $set: {
                        name: args.name,
                        country: args.country,
                        description: args.description,
                        location: args.location,
                    },
                },
                {
                    new: true,
                }
            );
        } catch (error) {
            throw new Error("Error updating destination");
        }
    },
};




const deleteDestination = {
    type: DestinationType,
    args: {
        id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
        try {
            return await Destination.findByIdAndDelete(args.id);
        } catch (error) {
            throw new Error("Error deleting destination");
        }
    },
};





module.exports = { addDestination, updateDestination, deleteDestination };


