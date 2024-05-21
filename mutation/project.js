
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const { ProjectType } = require('../typeDef/typeDef');
const Project = require("../models/Project");



const addProject = {
    type: ProjectType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLNonNull(GraphQLString) },
        status: {
            type: new GraphQLEnumType({
                name: "ProjectStatus",
                values: {
                    new: { value: "not started" },
                    progress: { value: "in progress" },
                    completed: { value: "complete" },
                },
            }),
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        const project = new Project({
            name: args.name,
            details: args.details,
            status: args.status,
            clientId: args.clientId,
        });
        return project.save();
    },
};






let deleteProject = {
    type: ProjectType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
            projects.forEach((project) => {
                project.remove();
            });
        });
        return Project.findByIdAndDelete(args.id);
    },
};




let updateProject = {
    type: ProjectType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        details: { type: GraphQLString },
        status: {
            type: new GraphQLEnumType({
                name: "ProjectStatusUpdate",
                values: {
                    new: { value: "not started" },
                    progress: { value: "in progress" },
                    completed: { value: "complete" },
                },
            }),
        },
    },

    resolve(parent, args) {
        return Project.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    name: args.name,
                    details: args.details,
                    status: args.status,
                },
            },
            { new: true }
        );
    },
};





module.exports = { addProject ,updateProject,deleteProject};