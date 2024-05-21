const {
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { ProjectType } = require("../typeDef/typeDef");
const Project = require("../models/Project");


let projects = {
  type: new GraphQLList(ProjectType),
  resolve: async (parent, args) => {
    return await Project.find();
  },
};


let project = {
  type: ProjectType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Project.findById(args.id);
  },
};

let clientProjects = {
    type: new GraphQLList(ProjectType),
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const fetchData = await Project.find();
        let result = fetchData?.filter((item) => item?.clientId == args?.id);
        return result;
    },
};
    


module.exports = { projects, project, clientProjects };
