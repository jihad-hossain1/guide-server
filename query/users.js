const {
  GraphQLID,
  GraphQLList, 
} = require("graphql");

const { UserType } = require("../typeDef/typeDef");
const User = require("../models/User");



const users = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find();
    },
};



const user = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return User.findById(args.id);
    },
};


module.exports = { users, user };