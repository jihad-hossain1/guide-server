const {
  GraphQLID,
  GraphQLString,
} = require("graphql");

const { CityForAdd } = require("../typeDef/typeDef");
const City = require("../models/City");


const addCity = {
  type: CityForAdd,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    divisionId: { type: GraphQLID },
    countryId: { type: GraphQLID },
  },
  resolve: async (parent, args) => {
    try {
      const alreadyName = await City.findOne({ name: args?.name });
      if (alreadyName?.name == args?.name) {
        return new Error("city Already Exist , try another one");
      }
      const city = new City(args);
      return await city.save();
    } catch (error) {
      throw new Error("Error adding city");
    }
  },
};

const updateCity = {
  type: CityForAdd,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    divisionId: { type: GraphQLID },
    countryId: { type: GraphQLID },
  },
  resolve: async (parent, args) => {
    try {
      const city = await City.findByIdAndUpdate(args.id, {
        name: args.name || undefined,
        description: args.description || undefined,
        photo: args.photo || undefined,
        divisionId: args.divisionId || undefined,
        countryId: args.countryId || undefined,
      }, { new: true });
      return city;
    } catch (error) {
      throw new Error("Error updating city");
    }
  }
}







module.exports = { addCity,updateCity };
