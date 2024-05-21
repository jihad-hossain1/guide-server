const Continent = require("../models/Continent");
const Country = require("../models/Country");
const { CountryType, ContinentType } = require("../typeDef/typeDef");

const {
  GraphQLID,GraphQLList
} = require("graphql");


const continents = {
    type: new GraphQLList(ContinentType),
    resolve: async () => {
        try {
            return await Continent.find();
        } catch (error) {
            throw new Error(`Error fetching country: ${error}`);
        }
    },
};
    
const singleContinent = {
    type: new GraphQLList(CountryType),
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const fetchData = await Country.find();
        let result = fetchData?.filter((item) => item?.continentId == args?.id);
        return result;
    },
};


module.exports = { singleContinent, continents };