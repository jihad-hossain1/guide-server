const { GraphQLID, GraphQLNonNull, GraphQLList} = require("graphql");
const { TourGuideType, ImageType, TourGuideProfile } = require("../typeDef/typeDef");
const TourGuide = require("../models/TourGuide");
const TourGuideContribution = require("../models/TourGuideContribution");
const {
  TourGuideContributionType,
  TourGuideReserveType,
} = require("../typeDef/extraTypeDef");
const { fieldValidate } = require("../helpers/validateField");
const TourGuideReserve = require("../models/TourGuideReserve");
const Images = require("../models/Images");

const getTourGuides = {
  type: new GraphQLList(TourGuideType),
  resolve: async () => {
    try {
      const tourGuides = await TourGuide.find();

      console.log(tourGuides);
      
      return tourGuides;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getTourGuide = {
  type: TourGuideType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (_, args) => {
    try {
      const tourGuide = await TourGuide.findById(args.id);

      if (!tourGuide) {
        throw new Error("TourGuide not found");
      }

      return tourGuide;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const tourGuideProfile = {
  type: TourGuideType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (_, args) => {
    try {
      const tourGuide = await TourGuide.findOne({ clientId: args.id });
      console.log(tourGuide);

      if (!tourGuide) {
        throw new Error("TourGuide not found");
      }

      return tourGuide;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const tourGuidePlace = {
  type: TourGuideContributionType,
  args: {
    id: {
      type: GraphQLID,
    },
  },

  resolve: async (_, args) => {
    try {
      const contribution = await TourGuideContribution.findById(args.id);

      if (!contribution) {
        throw new Error("TourGuideContribution not found");
      }

      return contribution;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getGuideContributions = {
  type: new GraphQLList(TourGuideContributionType),
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },

  resolve: async (_, { id }) => {
    try {
      const data = await TourGuideContribution.find({ clientProfileID: id });

      if (!data) {
        throw new Error("TourGuideContribution not found");
      }

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getGuideReservs = {
  type: new GraphQLList(TourGuideReserveType),
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      if (!id) {
        throw new Error("Profile id is required");
      }

      const guideReservs = await TourGuideReserve.find({ clientProfileID: id });

      console.log("🚀 ~ resolve: ~ guideReservs:", guideReservs);

      if (!guideReservs) {
        throw new Error("No Guide reserves found!");
      }

      return guideReservs;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getGuideReserve = {
  type: TourGuideReserveType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      if (!id) {
        throw new Error("Reserve id is required");
      }

      const guideReservs = await TourGuideReserve.findById(id);

      if (!guideReservs) {
        throw new Error("No Guide reserve found!");
      }

      return guideReservs;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getGuidePlaceImages = {
  type: new GraphQLList(ImageType),
  args: {
    clientProfileID: {
      type: GraphQLNonNull(GraphQLID),
    },
  },

  resolve: async (_, { clientProfileID }) => {
    try {
      const images = await Images.find({ clientProfileID });
      return images;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  getTourGuide,
  tourGuideProfile,
  tourGuidePlace,
  getGuideContributions,
  getGuideReservs,
  getGuideReserve,
  getGuidePlaceImages,
  getTourGuides,
};
