const { GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");
const { ContinentType } = require("../typeDef/typeDef");
const mongoose = require("mongoose");
const Continent = require("../models/Continent");

const addContinent = {
  type: ContinentType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLNonNull(GraphQLString) },
    img: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    try {
      const trimedName = args?.name?.toLowerCase().trim();
      const alreadyName = await Continent.findOne({ name: trimedName });

      if (alreadyName) {
        return new Error("continet Already Exist , try another one");
      }

      const continet = new Continent({
        name: trimedName,
        code: args?.code,
        img: args?.img,
      });

      return await continet.save();
    } catch (error) {
      return new Error("Error adding continet");
    }
  },
};

module.exports = { addContinent };
