const {
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = require("graphql");
const { ClientType } = require("../typeDef/typeDef");
const Client = require("../models/Client");


let wpClients = {
  type: new GraphQLList(ClientType),
  resolve: async (parent, args) => {
    try {
      let allClients = await Client.find();
      return allClients;
    } catch (error) {
      console.log("failed to fetch: ", error);
    }
  },
};


// paginated client
const clients = {
    type: new GraphQLList(ClientType),
    args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
    },
    resolve: async (parent, args) => {
        try {
            const { page, limit } = args;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            let clientsData = await Client.find();
            return clientsData.slice(startIndex, endIndex);
        } catch (error) {
            return error;
        }
    },
};



const client = {
  type: ClientType,

  args: { id: { type: GraphQLID } },

  resolve: async (parent, args) => {
    try {
      return await Client.findById(args?.id);
    } catch (error) {
      return error;
    }
  },
};


module.exports = { wpClients,client,clients };