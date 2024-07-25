const { default: mongoose } = require("mongoose");
const TourSpot = require("../models/TourSpot");
const { TourSpotType } = require("../typeDef/typeDef");
const { GraphQLID, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require("graphql");

const singleCountryTourspotList = {
  type: new GraphQLList(TourSpotType),
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args) => {
    const fetchData = await TourSpot.find();
    let result = fetchData?.filter((item) => item?.countryId == args?.id);
    return result;
  },
};

const tourSpots = {
  type: new GraphQLList(TourSpotType),
  resolve: async () => {
    try {
      return await TourSpot.find();
    } catch (error) {
      throw new Error(`Error fetching TourSpot: ${error}`);
    }
  },
};

const tourSpotsPagination = {
  type: new GraphQLList(TourSpotType),
  args: {
    search: { type: GraphQLString },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const { search, page, limit } = args;
   
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const pageNumber = page || 1;
    const pageSize = limit || 10;
    const skip = (pageNumber - 1) * pageSize;

    try {
      const results = await TourSpot.find(query).skip(skip).limit(pageSize);
      return results;
    } catch (error) {
      throw new Error(`Error fetching TourSpot: ${error}`);
    }
  },
};

const singleTourspot = {
  type: TourSpotType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, { id }) => {
    
    try {
       if (!mongoose.Types.ObjectId.isValid(id)) {
                return new Error("Invalid TourSpot ID");
      }
      
      const fetchData = await TourSpot.findById(id);

      if (!fetchData) {
        throw new Error("TourSpot are not found")
      }
      return fetchData;
    } catch (error) {
      throw new Error(error.message)
    }
  },
};

const singleTourspotDetails = {
  type: TourSpotType,
  args: { slug: { type: GraphQLNonNull(GraphQLString) } },
  resolve: async (parent, args) => {
    try {
      const fetchData = await TourSpot.findOne({slug: args?.slug});
      return fetchData;
    } catch (error) {
      console.log(error);
    }
  },
};

const relatedTourSpots = {
  type: new GraphQLList(TourSpotType),
  args: { cityId: { type: GraphQLID } },
  resolve: async (parent, args) => {
    try {
      const fetchData = await TourSpot.find();
      let _i = fetchData?.filter((item) => item?.cityId == args?.cityId);
      return _i;
    } catch (error) {
      console.log(error);
    }
  },
};

const tourSpotsByCountryId = {
  type: new GraphQLList(TourSpotType),
  args: { countryId: { type: GraphQLID } },
  resolve: async (parent, args) => {
    try {
      const fetchData = await TourSpot.find();
      let _i = fetchData?.filter((item) => item?.countryId == args?.countryId);
      return _i;
    } catch (error) {
      console.log(error);
    }
  },
}

module.exports = {
  singleCountryTourspotList,
  singleTourspot,
  singleTourspotDetails,
  tourSpots,
  relatedTourSpots,
  tourSpotsByCountryId,
  tourSpotsPagination
};
