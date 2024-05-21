const {
  GraphQLID,
  GraphQLString,
} = require("graphql");

const Division = require("../models/Division");
const { DivisionType } = require("../typeDef/typeDef");
const { default: mongoose } = require("mongoose");





const addDivision = {
    type: DivisionType,
    args: {
        name: { type: GraphQLString },
        countryId: { type: GraphQLID },
        description: { type: GraphQLString },
        photo: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        const { name, description, photo, countryId } = args;
        try {
            if (!name || name.trim() == "") return new Error("name is required");

            if (!description || description.trim() == "") return new Error("description is required");
            
            if (!countryId) return new Error("country is required");

            if (!mongoose.Types.ObjectId.isValid(countryId)) {
                return new Error("Invalid country");
            }
            
            let trimed = await name.trim();

            const alreadyName = await Division.findOne({ name: trimed });
            
             if (alreadyName) {
               return new Error("Division Already Exist , try another one");
            }
            
            const division = new Division(args);

            let saved = await division.save();

            if (!saved) throw new Error("Error adding division");
            
            return saved;
        } catch (error) {
            throw new Error("Error adding division");
        }
    },
};

const updateDivision = {
    type: DivisionType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        photo: { type: GraphQLString },
        countryId: { type: GraphQLID },
    },
    resolve: async (parent, args) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(args.id)) {
                throw new Error("Invalid ID");
            }

            const division = await Division.findByIdAndUpdate(args.id, {
                name: args.name || undefined,
                description: args.description || undefined,
                photo: args.photo || undefined,
                countryId: args.countryId || undefined,
            })

            if (!division) {
                throw new Error("Division not found");
            }

            return division;

        } catch (error) {
            throw new Error(`Error updating division: ${error}`);
        }
    }
}



module.exports = { addDivision,updateDivision };