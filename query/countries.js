const { default: mongoose } = require("mongoose");
const Country = require("../models/Country");
const { CountryType } = require("../typeDef/typeDef");
const {
  GraphQLID,GraphQLList
} = require("graphql");


const countries = {
  type: new GraphQLList(CountryType),
  resolve: async () => {
    try {
      const countries = await Country.find();
      // console.log(countries.reverse());
      return countries.reverse();
    } catch (error) {
      throw new Error(`Error fetching country: ${error}`);
    }
  },
};

const singleCountry = {
  type: CountryType,
  resolve: async (parent, args) => {
    try {
      const countries = await Country.find();
      // console.log(countries.reverse());
      return countries.reverse();
    } catch (error) {
      throw new Error(`Error fetching country: ${error}`);
    }
  },
};

const country = {
  type: CountryType,
   args: { id: { type: GraphQLID } },
  resolve: async (parent, {id}) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }

      const country = await Country.findById(id);
      // console.log(countries.reverse());

      if (!country) {
        throw new Error("Country not found");
      }
      return country
    } catch (error) {
      throw new Error(`Error fetching country: ${error}`);
    }
  },
};



module.exports = { countries, singleCountry ,country};
