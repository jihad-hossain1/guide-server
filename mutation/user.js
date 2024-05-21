
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { UserType } = require("../typeDef/typeDef");
const User = require("../models/User");



const addUser = {
    type: UserType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        const user = new User({
            name: args.name,
            phone: args.phone,
            email: args.email,
            password: args.password,
            photo: args.photo,
        });
        return user.save();
        // Client.create();
    },
};
   



const updateUser = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        photo: { type: GraphQLString },
    },

    resolve(parent, args) {
        return User.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    name: args.name,
                    phone: args.phone,
                    password: args.password,
                    photo: args.photo,
                },
            },
            { new: true }
        );
    },
};
   


const deleteUser = {
    type: UserType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        return User.findByIdAndDelete(args.id);
    },
};












module.exports = { addUser, updateUser, deleteUser };