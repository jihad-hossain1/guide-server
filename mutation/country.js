const { GraphQLID, GraphQLString } = require("graphql");
const Country = require("../models/Country");
const { CountryType } = require("../typeDef/typeDef");
const mongoose = require("mongoose");

const addCountry = {
  type: CountryType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    continentId: { type: GraphQLID },
  },
  resolve: async (parent, args) => {
    try {
      const alreadyName = await Country.findOne({ name: args?.name });
      if (alreadyName) {
        return new Error("Country Already Exist , try another one");
      }
      const country = new Country(args);
      return await country.save();
    } catch (error) {
      return new Error("Error adding country");
    }
  },
};

const updateCountry = {
  type: CountryType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    continentId: { type: GraphQLID },
  },
  resolve: async (parent, args) => {
    try {

      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new Error("Invalid ID");
      }
      const country = await Country.findByIdAndUpdate(args.id, {
        name: args.name || undefined,
        description: args.description || undefined,
        photo: args.photo || undefined,
        continentId: args.continentId || undefined,
      }, {
        new: true,
      });
      if (!country) {
        throw new Error("Country not found");
      }
      return country;
    } catch (error) {
      throw new Error(`Error updating country: ${error}`);
    }
  },
}

module.exports = { addCountry, updateCountry };
